import JsonValue = require('./classes/value/JsonValue');

class JsonArray extends JsonValue{
    private let values: JsonValue[];

    stringify() : string {
        let arrayStringified = "";

        arrayStringified += "[";

        let valueIndex = 0;
        for (let value of this.values) {
            arrayStringified += value.stringify();

            if (valueIndex < this.values.length - 1) {
                arrayStringified += ", ";
            }
            valueIndex++;
        }

        arrayStringified += "]";

        return arrayStringified;
    }
}
