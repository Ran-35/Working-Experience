# EasyExcel
## 作用
Java后端将数据导出为Excel

### 基本组成  

#### 一、WeatherExcel.class(要导出的数据由此得来)  
##### 1. 一层表头
```java
@Data
@ColumnWidth(15)        // Excel 表格中每列的宽度
@EqualsAndHashCode  
@HeadRowHeight(30)      // 设置 Excel 表格头部行的高度
@ContentRowHeight(25)   // 设置 Excel 内容行的高度为 25
@Accessors(chain = true)// 所有的 setter 方法会返回当前对象实例，这样可以在调用 setter 方法时实现链式调用
@ApiModel(value = "天气报表")
public class WeatherExcel {
    @ColumnWidth(20)            // 表格宽度可单独设置
    @ExcelProperty({"预测时间"}) // 将数据与表头映射
    @ApiModelProperty(value = "预测时间")
    private Date date;

    @ExcelProperty({"数据类型"})
    @ApiModelProperty(value = "数据类型(0.实时值/1.预测值)")
    private String type;

    @ExcelProperty({"相对湿度"})
    @ApiModelProperty(value = "相对湿度")
    private String rh;

    @ExcelProperty({"温度"})
    @ApiModelProperty(value = "温度")
    private String temp;

    @ExcelProperty({"紫外线指数"})
    @ApiModelProperty(value = "紫外线指数")
    private String uv;
}
```
##### 2. 多层表头
**注：若表头上方还有表头，则用","隔开**
```java
public class WeatherExcel {
    @ColumnWidth(20)            // 表格宽度可单独设置
    @ExcelProperty({"预测时间"}) // 将数据与表头映射
    @ApiModelProperty(value = "预测时间")
    private Date date;

    @ExcelProperty({"天气预测","数据类型"})
    @ApiModelProperty(value = "数据类型(0.实时值/1.预测值)")
    private String type;

    @ExcelProperty({"天气预测","相对湿度"})
    @ApiModelProperty(value = "相对湿度")
    private String rh;

    @ExcelProperty({"天气预测","温度"})
    @ApiModelProperty(value = "温度")
    private String temp;

    @ExcelProperty({"天气预测","紫外线指数"})
    @ApiModelProperty(value = "紫外线指数")
    private String uv;
}
```

#### 二、EasyExcelDynamicHeaderHandler.class(自定义表头处理器类)
##### 1.自定义表头处理器
```java 
/**
 * 1.自定义表头处理器
 */
public class EasyExcelDynamicHeaderHandler implements CellWriteHandler {
    /**
     * 占位符-占位符对应的值
     */
    private final Map<String, String> replacements;

    public EasyExcelDynamicHeaderHandler(Map<String, String> replacements) {
        this.replacements = replacements;
    }

    /**
     * 解析占位符(占位符用{}包住)
     */
    PropertyPlaceholderHelper placeholderHelper = new PropertyPlaceholderHelper("{", "}");

    /**
     * 创建一个 WriteHandler 对象，用于处理表头样式
     */
    @Override
    public void beforeCellCreate(WriteSheetHolder writeSheetHolder, WriteTableHolder writeTableHolder, Row row, Head head, Integer integer, Integer integer1, Boolean aBoolean) {
        // 如果表头名称列表不为空，则创建一个 Properties 对象，存储多个替换内容
        if (head != null && CollectionUtils.isNotEmpty(head.getHeadNameList())) {
            List<String> headNameList = head.getHeadNameList();
            if (CollectionUtils.isNotEmpty(headNameList)) {
                // 使用 Properties 对象来存储替换值
                Properties properties = new Properties();
                for (Map.Entry<String, String> entry : replacements.entrySet()) {
                    properties.setProperty(entry.getKey(), entry.getValue());
                }
                // 遍历表头名称列表，替换每个表头名称中的占位符
                for (int i = 0; i < headNameList.size(); i++) {
                    String headName = headNameList.get(i);
                    headNameList.set(i, placeholderHelper.replacePlaceholders(headName, properties));
                }
            }
        }
    }

    /**
     * 创建一个 WriteHandler 对象，用于处理单元格样式
     */
    @Override
    public void afterCellCreate(WriteSheetHolder writeSheetHolder, WriteTableHolder writeTableHolder,
                                Cell cell, Head head, Integer integer, Boolean aBoolean) {
    }
}

```
##### 2.自定义单元格处理器
```java 
public class MergeSameColumnHandler implements CellWriteHandler {

    private final List<Integer> columnsToMerge;
    // 记录每列的合并信息：key=列索引，value=[合并起始行, 当前值]
    private final Map<Integer, Object[]> mergeInfoMap = new HashMap<>();

    public MergeSameColumnHandler(List<Integer> columnsToMerge) {
        this.columnsToMerge = columnsToMerge;
    }

    @Override
    public void afterCellDispose(WriteSheetHolder writeSheetHolder, WriteTableHolder writeTableHolder,
                                 List<WriteCellData<?>> cellDataList, Cell cell, Head head,
                                 Integer relativeRowIndex, Boolean isHead) {
        int currentRowIndex = cell.getRowIndex();  // 获取当前行号
        int columnIndex = cell.getColumnIndex();

        // 只处理数据行（跳过表头）
        if (isHead || !columnsToMerge.contains(columnIndex)) {
            return;
        }

        Object currentValue; 
        switch (cell.getCellType()) {
            case STRING: currentValue = cell.getStringCellValue();
            case NUMERIC: currentValue = cell.getNumericCellValue();
            case BOOLEAN: currentValue = cell.getBooleanCellValue();
            default: currentValue = "";
        }
        Object[] mergeInfo = mergeInfoMap.get(columnIndex);

        if (mergeInfo == null) {
            // 初始化：记录起始行和当前值
            mergeInfoMap.put(columnIndex, new Object[]{currentRowIndex, currentValue});
        } else {
            int startRow = (int) mergeInfo[0];
            Object prevValue = mergeInfo[1];

            if (prevValue.equals(currentValue)) {
                // 值相同：继续合并，更新合并信息
                mergeInfoMap.put(columnIndex, new Object[]{startRow, currentValue});
            } else {
                // 值不同：执行合并并重置合并信息
                if (startRow < currentRowIndex - 1) {
                    writeSheetHolder.getSheet().addMergedRegion(
                        new CellRangeAddress(startRow, endRow, columnIndex, columnIndex)
                    );
                }
                // 重新设置起始行和当前值
                mergeInfoMap.put(columnIndex, new Object[]{currentRowIndex, currentValue});
            }
        }
    }
}
```
##### 3.同时自定义表头及表格处理
```java


```
#### 三、EasyExcelUtils.class(导出数据工具类)
##### 1. 固定列及表头
```java
/**
 * 纯静态列导出：表格的表头顺序与xxxExcel.class中的顺序一致
 *
 * @param fileName  文件名
 * @param sheetName 文本簿名
 * @param list      数据集(必须为clazz类型或其子类)
 * @param clazz     列模型
 */
public static void exportExcel(HttpServletResponse response, String fileName, String sheetName,
                                List<?> list, Class<?> clazz) {
    response.setCharacterEncoding("UTF-8");
    response.setHeader("content-Type", "application/vnd.ms-excel");
    try {
        response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
    } catch (UnsupportedEncodingException ignore) {
    }

    try {
        EasyExcel.write(response.getOutputStream(), clazz)
                .sheet(sheetName)
                .registerWriteHandler(getHeadStyleStrategy()) //设置表头样式，不要可去掉
                .doWrite(list);
    } catch (IOException e) {
        throw new RenException("数据导出失败");
    }
}
```
```java
public void exportWeatherData(HttpServletResponse response, Map<String, Object> params) {
    List<WeatherDTO> list = this.list(params);
    List<WeatherExcel> listExcel = ConvertUtils.sourceToTarget(list, WeatherExcel.class);

    Map<String, Object> paramsExcel = Maps.newHashMap();
    paramsExcel.put("fileName", "天气数据_" + DateUtils.getDateStrToday());
    paramsExcel.put("sheetName", "天气数据");

    EasyExcelUtils.exportExcel(response, paramsExcel,listExcel,WeatherExcel.class);
}
```
##### 2. 固定列及表头 + 要导出的列可选择
```java
/**
 * 纯静态列导出(自定义导出列)
 *
 * @param fileName  文件名
 * @param sheetName 文本簿名
 * @param columns   列名(xxxExcel.class中的名称)
 * @param list      数据集(必须为clazz类型或其子类)
 * @param clazz     列模型
 */
public static void exportExcel(HttpServletResponse response, String fileName, String sheetName, List<String> columns,
                                List<?> list, Class<?> clazz) {
    response.setCharacterEncoding("UTF-8");
    response.setHeader("content-Type", "application/vnd.ms-excel");
    try {
        response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
    } catch (UnsupportedEncodingException ignore) {
    }

    try {
        EasyExcel.write(response.getOutputStream(), clazz)
                .sheet(sheetName)
                .registerWriteHandler(getHeadStyleStrategy())    //设置表头样式，不要可去掉
                .includeColumnFiledNames(columns)   // 增加选择的列导出
                .doWrite(list);
    } catch (IOException e) {
        throw new RenException("数据导出失败");
    }
}
```
##### 3. 表头内容动态可变
```java
/**
 * 1. xxxExcel.class中设置占位符  
 */
 public class WeatherExcel {
    @ColumnWidth(20)            // 表格宽度可单独设置
    @ExcelProperty({"location预测时间date"}) // 将数据与表头映射
    @ApiModelProperty(value = "预测时间")
    private Date date;

    @ExcelProperty({"location天气预测date","数据类型"})
    @ApiModelProperty(value = "数据类型(0.实时值/1.预测值)")
    private String type;

    @ExcelProperty({"location天气预测date","相对湿度"})
    @ApiModelProperty(value = "相对湿度")
    private String rh;

    @ExcelProperty({"location天气预测","温度"})
    @ApiModelProperty(value = "温度")
    private String temp;

    @ExcelProperty({"location天气预测","紫外线指数"})
    @ApiModelProperty(value = "紫外线指数")
    private String uv;
}
``` 
```java
/**
 * 2.在utils中设置设置替换的内容
 */
public static void exportExcel(HttpServletResponse response, String fileName, String sheetName, List<String> columns,
                                List<?> list, Class<?> clazz) {
    response.setCharacterEncoding("UTF-8");
    response.setHeader("content-Type", "application/vnd.ms-excel");
    try {
        response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
    } catch (UnsupportedEncodingException ignore) {
    }

    Map<String, String> replacements = new HashMap<>();
    replacements.put("location", "中国"); // 替换 {location} 为 中国
    replacements.put("date", "2024");     // 替换 {date} 为 2024

    try {
        EasyExcel.write(response.getOutputStream(), clazz)
                .sheet(sheetName)
                .registerWriteHandler(getHeadStyleStrategy())
                .registerWriteHandler(new EasyExcelDynamicHeaderHandler(replacements)) //自定义表头处理器会将location 和 date 替换为需要设置的内容
                .includeColumnFiledNames(columns)
                .doWrite(list);
    } catch (IOException e) {
        throw new RenException("数据导出失败");
    }
}
```
##### 4. 同一个Excel工作簿导出多个Sheet工作表
```java
/**
 *
 * @param params： fileName-文件名，
 *                replacements-动态表格内容(占位符-替换值),
 *                sheetMap - 多个工作簿(sheet1={list=list1,clazz=clazz1})
 */
public static void exportExcel(HttpServletResponse response, Map<String, Object> params) {
    // 默认文件名、文件簿名、动态列
    String fileName = (String) params.getOrDefault("fileName", "Excel_" + LocalDate.now());
    fileName = fileName + ".xlsx";
    // 占位符替换
    @SuppressWarnings("unchecked")
    Map<String, String> replacements = (Map<String, String>) params.getOrDefault("replacements", null);
    // 获取其中每一个工作簿
    @SuppressWarnings("unchecked")
    Map<String, Object> sheetMap = (Map<String, Object>) params.getOrDefault("sheetMap", Collections.emptyMap());

    response.setCharacterEncoding("UTF-8");
    response.setHeader("content-Type", "application/vnd.ms-excel");
    try {
        response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
    } catch (UnsupportedEncodingException ignore) {
    }

    try {
        // ✅ 创建一个统一的 ExcelWriter
        ExcelWriter excelWriter = EasyExcel.write(response.getOutputStream()).build();
        for (Map.Entry<String, Object> entry : sheetMap.entrySet()) {
            String sheetName = entry.getKey();

            @SuppressWarnings("unchecked")
            Map<String, Object> sheet = (Map<String, Object>) entry.getValue();
            List<?> listSheet = (List<?>) sheet.get("list");
            Class<?> clazzSheet = (Class<?>) sheet.get("clazz");

            WriteSheet writeSheet = EasyExcel.writerSheet(sheetName)
                    .head(clazzSheet)
                    .registerWriteHandler(getHeadStyleStrategy())
                    .registerWriteHandler(new EasyExcelDynamicHeaderHandler(replacements))
                    .build();

            excelWriter.write(listSheet, writeSheet);
        }
        // ✅ 关闭 writer
        excelWriter.finish();
    } catch (IOException e) {
        throw new RenException("数据导出失败");
    }
}
```
```java
public void exportWeatherData(HttpServletResponse response, Map<String, Object> params) {
    List<AirDTO> listAir = this.listAir(params);
    List<RainDTO> listRain = this.listRain(params);

    List<AirExcel> listExcelAir = ConvertUtils.sourceToTarget(listAir, AirExcel.class);
    List<RainExcel> listExcelRain = ConvertUtils.sourceToTarget(listRain, RainExcel.class);

    Map<String, Object> paramsSheetAir = Maps.newHashMap();
    paramsSheetAir.put("list", listExcelAir);
    paramsSheetAir.put("clazz", AirExcel.class);

    Map<String, Object> paramsSheetRain = Maps.newHashMap();
    paramsSheetRain.put("list", listExcelRain);
    paramsSheetRain.put("clazz", RainExcel.class);

    Map<String, Object> paramsSheet = Maps.newHashMap();
    paramsSheet.put("空气情况表", paramsSheetAir);
    paramsSheet.put("降雨情况表", paramsSheetRain);

    Map<String, Object> paramsExcel = Maps.newHashMap();
    paramsExcel.put("fileName", "气象数据_" + DateUtils.getDateStrToday());
    paramsExcel.put("sheetMap", paramsSheet);
    EasyExcelUtils.exportExcel(response, paramsExcel);
}
```
##### 5. 动态行 + 动态列导出
注意：主要在于定义好表头行-和内容行的内容  
(1)表头行：sheet1=[[储能充放电量, 对比项目], [储能充放电量, 对比站点组], [储能充放电量, 站点容量（kW）], [储能充放电量, 设备名称], [储能充放电量, 2025-12-03], [储能充放电量, 2025-12-04]]  

数组中，每一个小数组代表一列，若连续有两列相同的则会合并

(2)内容行：[[充电量, 对比1, 南京, 237.0 ,储能设备1, ...],[充电量, 对比1, 北京, 237.0 ,储能设备1, ...]]

数组中，每一个小数组代表一行
```java
/**
 * 动态列-动态行导出
 * @param params： fileName-文件名，
 *                sheetMap - 多个工作簿(sheet1={list=list1,clazz=clazz1}),
 *                headMap - 动态表头内容(sheet1=[[储能充放电量, 对比项目], [储能充放电量, 对比站点组], [储能充放电量, 站点容量（kW）], [储能充放电量, 设备名称], [储能充放电量, 2025-12-03], [储能充放电量, 2025-12-04]])
 *                  注：若headMap的value有两个连续一样的，就会合并为一个单元格
 *                contentList - 动态内容[[充电量, 对比1, 南京, 237.0 ,储能设备1, ...],
 *                                     [充电量, 对比1, 北京, 237.0 ,储能设备1, ...]]
 *                  注：列表的顺序必须和headMap的value的顺序一致。每个元素代表一行，每个单元格的内容由,隔开
 *
 */
public static void exportDynamicExcel(HttpServletResponse response, Map<String, Object> params){
    try {
        // 默认文件名、文件簿名、动态列
        String fileName = (String) params.getOrDefault("fileName", "Excel_" + LocalDate.now());
        fileName = fileName + ".xlsx";

        response.setCharacterEncoding("UTF-8");
        response.setHeader("content-Type", "application/vnd.ms-excel");
        response.setHeader("Content-Disposition","attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
    } catch (Exception ignore) {
    }

    try {
        // ✅核心代码：表头和正文的样式在此
        ExcelWriter writer = EasyExcelFactory.write(response.getOutputStream())
                .registerWriteHandler(EasyExcelDynamicHandler.setConfigure())
                .registerWriteHandler(new EasyExcelDynamicHandler())
                .registerWriteHandler(new EasyExcelDynamicHandler())
                .registerWriteHandler(new EasyExcelDynamicHandler(ListUtils.newArrayList(0, 1)))
                .build();

        // 获取动态表头
        @SuppressWarnings("unchecked")
        Map<String, List<List<String>>> headMap = (Map<String, List<List<String>>>) params.get("headMap");
        // 获取内容表格
        @SuppressWarnings("unchecked")
        List<List<Object>> contentList = (List<List<Object>>) params.get("contentList");


        // 获取其中每一个工作簿
        @SuppressWarnings("unchecked")
        Map<String, Object> sheetMap = (Map<String, Object>) params.getOrDefault("sheetMap", Collections.emptyMap());
        int i = 0;
        for (Map.Entry<String, Object> entry : sheetMap.entrySet()){
            String sheetName = entry.getKey();

            // 创建一个工作簿
            WriteSheet sheet = new WriteSheet();
            sheet.setSheetName(sheetName);
            sheet.setSheetNo(i);

            // 创建一个表
            WriteTable table = new WriteTable();
            table.setTableNo(1);
            table.setHead(headMap.get(sheetName));
            writer.write(contentList, sheet, table);
        }
        // ✅ 关闭 writer
        writer.finish();
    } catch (IOException e) {
        throw new RenException("Excel导出异常");
    }
}

```




##### n. 单独设置表头样式
```java
private static WriteHandler getHeadStyleStrategy() {
    // 定义表头样式
    WriteCellStyle headStyle = new WriteCellStyle();
    WriteFont headFont = new WriteFont();
    headFont.setFontName("宋体");
    headFont.setFontHeightInPoints((short) 12);
    headFont.setBold(true);
    headStyle.setWriteFont(headFont);

    // 设置背景颜色为白色
    headStyle.setFillForegroundColor(IndexedColors.WHITE.getIndex());
    headStyle.setFillPatternType(FillPatternType.SOLID_FOREGROUND);

    // 设置文字居中
    headStyle.setHorizontalAlignment(HorizontalAlignment.CENTER);
    headStyle.setVerticalAlignment(VerticalAlignment.CENTER);

    // 定义内容样式（可选）
    WriteCellStyle contentStyle = new WriteCellStyle();
    contentStyle.setHorizontalAlignment(HorizontalAlignment.CENTER);
    contentStyle.setVerticalAlignment(VerticalAlignment.CENTER);

    // 返回样式策略
    return new HorizontalCellStyleStrategy(headStyle, contentStyle);
}
```




