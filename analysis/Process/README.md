# Data Processing

This folder documents the data processing workflow used to prepare the SDG dataset for the web prototype.

The SDG data used in this project were collected on **13 December 2025**. The original downloaded files are stored in the `Raw Data/` folder. The final data file used by the web prototype is stored in the root `data/` folder as `sdg_data_mapped_real.json`.

## Processing steps

### Step 1: Raw data collection

The original SDG source files were downloaded on **13 December 2025** and stored in the `Raw Data/` folder.

### Step 2: Convert raw data to CSV

`RawDataToCSV.ipynb` was used to convert the original raw SDG files into CSV files for further processing.

### Step 3: Merge CSV data

`MergeCSVData.ipynb` was used to merge the converted CSV files into one combined dataset. The output of this step is `all_sdg_data.csv`.

This file contains SDG values organized by country, year, SDG number, and value.

### Step 4: Map country names to ISO3 codes

`UNSDMethodology.csv` was used to map country names to ISO-alpha3 country codes.

This step is needed because the web prototype uses ISO3 country codes to connect SDG data with the interactive map.

### Step 5: Convert CSV to JSON

`CSVtoJSON.ipynb` was used to convert `all_sdg_data.csv` into the JSON format required by the web prototype.

The final output is `data/sdg_data_mapped_real.json`.

This JSON file is used directly by the web application. The data are organized by ISO3 country code, year, and SDG value.