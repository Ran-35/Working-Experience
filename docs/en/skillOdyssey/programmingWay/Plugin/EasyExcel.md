# EasyExcel - Data Export Tool

## Purpose

EasyExcel is a lightweight Java library used to export backend data to Excel files. It provides flexible control over reading, writing, and configuring table headers, content, and other properties, greatly simplifying the data export process.

## Basic Components

### 1. WeatherExcel.class (Data to be exported)

#### 1. Single-Level Header

```java
@Data
@ColumnWidth(15)        // Set the width of each column in Excel
@EqualsAndHashCode  
@HeadRowHeight(30)      // Set the height of the header row
@ContentRowHeight(25)   // Set the height of the content rows to 25
@Accessors(chain = true)// All setter methods return the current object instance, enabling method chaining
@ApiModel(value = "Weather Report")
public class WeatherExcel {
    @ColumnWidth(20)            // Set column width individually
    @ExcelProperty({"Forecast Time"}) // Map data to the header
    @ApiModelProperty(value = "Forecast Time")
    private Date date;

    @ExcelProperty({"Data Type"})
    @ApiModelProperty(value = "Data Type (0. Real-time/1. Forecast)")
    private String type;

    @ExcelProperty({"Relative Humidity"})
    @ApiModelProperty(value = "Relative Humidity")
    private String rh;

    @ExcelProperty({"Temperature"})
    @ApiModelProperty(value = "Temperature")
    private String temp;

    @ExcelProperty({"UV Index"})
    @ApiModelProperty(value = "UV Index")
    private String uv;
}
```

#### 2. Multi-Level Header

```java
public class WeatherExcel {
    @ColumnWidth(20)            // Set column width individually
    @ExcelProperty({"Forecast Time"}) // Map data to the header
    @ApiModelProperty(value = "Forecast Time")
    private Date date;

    @ExcelProperty({"Weather Forecast", "Data Type"})
    @ApiModelProperty(value = "Data Type (0. Real-time/1. Forecast)")
    private String type;

    @ExcelProperty({"Weather Forecast", "Relative Humidity"})
    @ApiModelProperty(value = "Relative Humidity")
    private String rh;

    @ExcelProperty({"Weather Forecast", "Temperature"})
    @ApiModelProperty(value = "Temperature")
    private String temp;

    @ExcelProperty({"Weather Forecast", "UV Index"})
    @ApiModelProperty(value = "UV Index")
    private String uv;
}
```

### 2. EasyExcelDynamicHeaderHandler.class (Custom Header Processor Class)

#### 1. Custom Header Processor

```java
public class EasyExcelDynamicHeaderHandler implements CellWriteHandler {
    private final Map<String, String> replacements;

    // Placeholder-value mapping
    public EasyExcelDynamicHeaderHandler(Map<String, String> replacements) {
        this.replacements = replacements;
    }

    // Parse placeholders (placeholders are enclosed in {})
    PropertyPlaceholderHelper placeholderHelper = new PropertyPlaceholderHelper("{", "}"); 

    // Create a WriteHandler object to handle the header style
    @Override
    public void beforeCellCreate(WriteSheetHolder writeSheetHolder, WriteTableHolder writeTableHolder, 
                                  Row row, Head head, Integer integer, Integer integer1, Boolean aBoolean) {
        if (head != null && CollectionUtils.isNotEmpty(head.getHeadNameList())) {
            List<String> headNameList = head.getHeadNameList();
            if (CollectionUtils.isNotEmpty(headNameList)) {
                Properties properties = new Properties();
                for (Map.Entry<String, String> entry : replacements.entrySet()) {
                    properties.setProperty(entry.getKey(), entry.getValue());
                }
                for (int i = 0; i < headNameList.size(); i++) {
                    String headName = headNameList.get(i);
                    headNameList.set(i, placeholderHelper.replacePlaceholders(headName, properties));
                }
            }
        }
    }

    // Create a WriteHandler object to handle cell styles
    @Override
    public void afterCellCreate(WriteSheetHolder writeSheetHolder, WriteTableHolder writeTableHolder, 
                                 Cell cell, Head head, Integer integer, Boolean aBoolean) {
        // Handle the cell style here if needed
    }
}
```

#### 2. Custom Cell Processor

```java
public class MergeSameColumnHandler implements CellWriteHandler {
    private final List<Integer> columnsToMerge;
    // Record the merge information for each column: key = column index, value = [merge start row, current value]
    private final Map<Integer, Object[]> mergeInfoMap = new HashMap<>();

    public MergeSameColumnHandler(List<Integer> columnsToMerge) {
        this.columnsToMerge = columnsToMerge;
    }

    @Override
    public void afterCellDispose(WriteSheetHolder writeSheetHolder, WriteTableHolder writeTableHolder,
                                  List<WriteCellData<?>> cellDataList, Cell cell, Head head,
                                  Integer relativeRowIndex, Boolean isHead) {
        int currentRowIndex = cell.getRowIndex();  // Get the current row number
        int columnIndex = cell.getColumnIndex();

        // Only process data rows (skip headers)
        if (isHead || !columnsToMerge.contains(columnIndex)) {
            return;
        }

        Object currentValue = getCellValue(cell);
        Object[] mergeInfo = mergeInfoMap.get(columnIndex);

        if (mergeInfo == null) {
            // Initialize: record the starting row and current value
            mergeInfoMap.put(columnIndex, new Object[]{currentRowIndex, currentValue});
        } else {
            int startRow = (int) mergeInfo[0];
            Object prevValue = mergeInfo[1];

            if (prevValue.equals(currentValue)) {
                // Same value: continue merging, update merge information
                mergeInfoMap.put(columnIndex, new Object[]{startRow, currentValue});
            } else {
                // Different values: perform merge and reset merge information
                if (startRow < currentRowIndex - 1) {
                    writeSheetHolder.getSheet().addMergedRegion(
                            new CellRangeAddress(startRow, currentRowIndex - 1, columnIndex, columnIndex)
                    );
                }
                // Reset starting row and current value
                mergeInfoMap.put(columnIndex, new Object[]{currentRowIndex, currentValue});
            }
        }
    }

    private Object getCellValue(Cell cell) {
        switch (cell.getCellType()) {
            case STRING: return cell.getStringCellValue();
            case NUMERIC: return cell.getNumericCellValue();
            case BOOLEAN: return cell.getBooleanCellValue();
            default: return "";
        }
    }
}
```

#### 3. Simultaneous Custom Header and Table Processing

```java
// This section of the processor code can be used for both custom header and table processing, typically combining multiple processors in specific scenarios.
```

### 3. EasyExcelUtils.class (Data Export Utility Class)

#### 1. Fixed Columns and Headers

```java
/**
 * Static column export: The order of the headers in the table is the same as in xxxExcel.class
 *
 * @param fileName  File name
 * @param sheetName Sheet name
 * @param list      Data set (must be of clazz type or its subclass)
 * @param clazz     Column model
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
                .registerWriteHandler(getHeadStyleStrategy()) // Set header style, omit if unnecessary
                .doWrite(list);
    } catch (IOException e) {
        throw new RenException("Data export failed");
    }
}
```

```java
public void exportWeatherData(HttpServletResponse response, Map<String, Object> params) {
    List<WeatherDTO> list = this.list(params);
    List<WeatherExcel> listExcel = ConvertUtils.sourceToTarget(list, WeatherExcel.class);

    Map<String, Object> paramsExcel = Maps.newHashMap();
    paramsExcel.put("fileName", "Weather Data_" + DateUtils.getDateStrToday());
    paramsExcel.put("sheetName", "Weather Data");

    EasyExcelUtils.exportExcel(response, paramsExcel,listExcel,WeatherExcel.class);
}
```

#### 2. Fixed Columns and Headers + Selectable Columns for Export

```java
/**
 * Static column export (customizable export columns)
 *
 * @param fileName  File name
 * @param sheetName Sheet name
 * @param columns   Column names (as in xxxExcel.class)
 * @param list      Data set (must be of clazz type or its subclass)
 * @param clazz     Column model
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
                .registerWriteHandler(getHeadStyleStrategy())    // Set header style, omit if unnecessary
                .includeColumnFiledNames(columns)   // Export
```


only selected columns
.doWrite(list);
} catch (IOException e) {
throw new RenException("Data export failed");
}
}

````

#### 3. Dynamic Header Content

```java
/**
 * 1. Set placeholders in the xxxExcel.class  
 */
 public class WeatherExcel {
    @ColumnWidth(20)            // Set column width individually
    @ExcelProperty({"locationForecastTime"}) // Map data to the header
    @ApiModelProperty(value = "Forecast Time")
    private Date date;

    @ExcelProperty({"locationWeatherForecast","Data Type"})
    @ApiModelProperty(value = "Data Type (0. Real-time/1. Forecast)")
    private String type;

    @ExcelProperty({"locationWeatherForecast","Relative Humidity"})
    @ApiModelProperty(value = "Relative Humidity")
    private String rh;

    @ExcelProperty({"locationWeatherForecast","Temperature"})
    @ApiModelProperty(value = "Temperature")
    private String temp;

    @ExcelProperty({"locationWeatherForecast","UV Index"})
    @ApiModelProperty(value = "UV Index")
    private String uv;
}
````

```java
/**
 * 2. Set replacements in utils for dynamic headers
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
    replacements.put("location", "China"); // Replace {location} with China
    replacements.put("date", "2024");     // Replace {date} with 2024

    try {
        EasyExcel.write(response.getOutputStream(), clazz)
                .sheet(sheetName)
                .registerWriteHandler(getHeadStyleStrategy())
                .registerWriteHandler(new EasyExcelDynamicHeaderHandler(replacements)) // The dynamic header processor will replace location and date with the specified content
                .includeColumnFiledNames(columns)
                .doWrite(list);
    } catch (IOException e) {
        throw new RenException("Data export failed");
    }
}
```

#### 4. Export Multiple Sheets in One Workbook

```java
/**
 * 
 * @param params: fileName-File name, 
 *                replacements-Dynamic table content (placeholder-replacement value), 
 *                sheetMap-Multiple workbooks (sheet1={list=list1,clazz=clazz1})
 */
public static void exportExcel(HttpServletResponse response, Map<String, Object> params) {
    // Default file name, sheet name, dynamic columns
    String fileName = (String) params.getOrDefault("fileName", "Excel_" + LocalDate.now());
    fileName = fileName + ".xlsx";
    // Placeholder replacements
    @SuppressWarnings("unchecked")
    Map<String, String> replacements = (Map<String, String>) params.getOrDefault("replacements", null);
    // Get each workbook
    @SuppressWarnings("unchecked")
    Map<String, Object> sheetMap = (Map<String, Object>) params.getOrDefault("sheetMap", Collections.emptyMap());

    response.setCharacterEncoding("UTF-8");
    response.setHeader("content-Type", "application/vnd.ms-excel");
    try {
        response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
    } catch (UnsupportedEncodingException ignore) {
    }

    try {
        // ✅ Create a unified ExcelWriter
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
        // ✅ Close the writer
        excelWriter.finish();
    } catch (IOException e) {
        throw new RenException("Data export failed");
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
    paramsSheet.put("Air Quality Table", paramsSheetAir);
    paramsSheet.put("Rainfall Table", paramsSheetRain);

    Map<String, Object> paramsExcel = Maps.newHashMap();
    paramsExcel.put("fileName", "Meteorological Data_" + DateUtils.getDateStrToday());
    paramsExcel.put("sheetMap", paramsSheet);
    EasyExcelUtils.exportExcel(response, paramsExcel);
}
```

#### 5. Dynamic Rows + Dynamic Columns Export

(Note: Mainly focuses on defining header and content row information)
(1) Header Rows: `sheet1=[[Storage Charging and Discharging Volume, Comparison Project], [Storage Charging and Discharging Volume, Comparison Station Group], [Storage Charging and Discharging Volume, Station Capacity (kW)], ...]`

(2) Content Rows: `[[Charging Volume, Comparison 1, Nanjing, 237.0, Energy Device 1, ...], [Charging Volume, Comparison 1, Beijing, 237.0, Energy Device 1, ...]]`

```java
/**
 * Dynamic column and row export
 * @param params: fileName-File name,
 *                sheetMap-Multiple workbooks (sheet1={list=list1,clazz=clazz1}),
 *                headMap-Dynamic header content (sheet1=[[Storage Charging and Discharging Volume, Comparison Project], [Storage Charging and Discharging Volume, Comparison Station Group], ...]),
 *                contentList-Dynamic content [[Charging Volume, Comparison 1, Nanjing, 237.0, Energy Device 1, ...], ...]
 */
public static void exportDynamicExcel(HttpServletResponse response, Map<String, Object> params){
    try {
        // Default file name, sheet name, dynamic columns
        String fileName = (String) params.getOrDefault("fileName", "Excel_" + LocalDate.now());
        fileName = fileName + ".xlsx";

        response.setCharacterEncoding("UTF-8");
        response.setHeader("content-Type", "application/vnd.ms-excel");
        response.setHeader("Content-Disposition","attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
    } catch (Exception ignore) {
    }

    try {
        // ✅ Core code: Table header and body styles
        ExcelWriter writer = EasyExcelFactory.write(response.getOutputStream())
                .registerWriteHandler(EasyExcelDynamicHandler.setConfigure())
                .registerWriteHandler(new EasyExcelDynamicHandler())
                .registerWriteHandler(new EasyExcelDynamicHandler())
                .registerWriteHandler(new EasyExcelDynamicHandler(ListUtils.newArrayList(0, 1)))
                .build();

        // Get dynamic table headers
        @SuppressWarnings("unchecked")
        Map<String, List<List<String>>> headMap = (Map<String, List<List<String>>>) params.get("headMap");
        // Get content table
        @SuppressWarnings("unchecked")
        List<List<Object>> contentList = (List<List<Object>>) params.get("contentList");

        // Get each workbook
        @SuppressWarnings("unchecked")
        Map<String, Object> sheetMap = (Map<String, Object>) params.getOrDefault("sheetMap", Collections.emptyMap());
        int i = 0;
        for (Map.Entry<String, Object> entry : sheetMap.entrySet()){
            String sheetName = entry.getKey();

            // Create a workbook
            WriteSheet sheet = new WriteSheet();
            sheet.setSheetName(sheetName);
            sheet.setSheetNo(i);

            // Create a table
            WriteTable table = new WriteTable();
            table.setTableNo(1);
            table.setHead(headMap.get(sheetName));
            writer.write(contentList, sheet, table);
        }
        // ✅ Close the writer
        writer.finish();
    } catch (IOException e) {
        throw new RenException("Excel export exception");
    }
}
```

---

This is a complete translation of the EasyExcel Java tool documentation. It explains how to use various features of EasyExcel for dynamic and static data export, including custom header processing, merging columns, and working with multiple sheets.
