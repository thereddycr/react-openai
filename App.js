import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Configuration, OpenAIApi } from "openai";

export default function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const configuration = new Configuration({
    apiKey: "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",
    // apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const handleClick = async (value) => {
    console.log(value);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      });
      setResult(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={(text) => {
          setValue(text);
        }}
        placeholder="Type Something Here!"
        style={{
          borderWidth: 1,
          width: 250,
          height: 50,
          paddingLeft: 5,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          handleClick(value);
        }}
        style={{
          backgroundColor: "blue",
          width: 100,
          height: 40,
          borderRadius: 50,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Send
        </Text>
      </TouchableOpacity>
      <Text>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
