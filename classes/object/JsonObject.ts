import JsonValue = require("../value/JsonValue");


class JsonObject extends JsonValue{
    private let values: {key: string, value: JsonValue}[];

    stringify() : string {
        let objectStringified = "";

        objectStringified += "{";

        let pairKeyValueIndex = 0;
        for (let pairKeyValue of this.values) {
            // Key
            objectStringified += "\"";
            objectStringified += pairKeyValue.key;
            objectStringified += "\"";

            // Separator
            objectStringified += " : ";

            // Value(s)
            objectStringified += pairKeyValue.value.stringify();

            if (pairKeyValueIndex < this->values.size()-1)
            objectStringified += ", ";

            pairKeyValueIndex ++;
        }

        objectStringified += "]";

        return objectStringified;
    }
}
