# tcx2json

This is a command line tool to convert a TCX (Training Center XML) file to JSON format. It is written in JavaScript and uses Deno.

The TCX file format is used by Garmin devices and other devices to store data such as GPS coordinates, heart rate, and other sensor data. You can export it for example from the Garmin Connect application.

The TCX file format schema is described on this page: https://www8.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd

The JSON file that produces tcx2json is a raw one-to-one mapping of the TCX XML file. It
can seem verbose, but that is on purpose.

## Binary Release

You can download the binary version of the CLI tool from the releases page. The binary is compiled for x86 Linux.

Start the application via:

```bash
./tcx2json /path/to/your/file.tcx
```

The generated JSON is printed on the console. If you want to redirect it to a file you
can do it like this:

```bash
./tcx2json /path/to/your/file.tcx >file.json
```

## Source Installation

You can install the tool from source using the following command:

```bash
deno install 
```

## Usage

By specifying the tcx file as an argument, you can convert it to JSON format. For example:

```bash
deno run --allow-read main.ts /path/to/your/file.tcx
```

The JSON output will be printed to the console. You can then redirect the console output to
a file, like so:

```bash
deno run --allow-read main.ts /path/to/your/file.tcx >file.json
```

## License

This project is licensed under the MIT License.
