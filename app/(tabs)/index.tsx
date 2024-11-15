import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, Text, View, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function App() {
  const [answerValue, setAnswerValue] = useState(0);
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [memoryValue, setMemoryValue] = useState(0);
  const [operatorValue, setOperatorValue] = useState("");
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [history, setHistory] = useState([]);

  // buttonPressed Function
  const buttonPressed = (value) => {
    // Check if button is All Clear
    if (value == "AC") {
      setAnswerValue(0);
      setMemoryValue(0);
      setOperatorValue("");
      setReadyToReplace(true);
    }
    // Check if button is "="
    else if (value == "=") {
      const result = calculateEquals();
      setAnswerValue(result.toString());
      setMemoryValue(result.toString());
      setOperatorValue("");
      setReadyToReplace(true);
      // Add calculation to history
      if (operatorValue) {
        const previous = memoryValue;
        const current = answerValue;
        const calculation = `${previous} ${operatorValue} ${current} = ${result}`;
        addToHistory(calculation);
      }
    }

    // Check if value is numbers
    else if (!isNaN(value)) {
      const newAnswerValue = readyToReplace
        ? handleNumber(value)
        : answerValue + value;
      setAnswerValue(parseFloat(newAnswerValue));
      setReadyToReplace(false);
      // Numbers Pressed Alert
    }
    // Check if '+/-' is pressed
    else if (value === "+/-") {
      const convertAnswer = parseFloat(answerValue) * -1;
      //Replace the old answerValue with the new Answer
      setAnswerValue(convertAnswer);
    }
    // Check if % is pressed
    else if (value == "%") {
      const PercentAnswer = parseFloat(answerValue) * 0.01;
      //Replace the old answerValue with the new Answer
      setAnswerValue(PercentAnswer);
    }
    else if (value == "DEL") {
      const newAnswerValue = answerValue.toString().slice(0, -1) || "0";
      setAnswerValue(parseFloat(newAnswerValue));
    }
    //Check if is value are operators
    else if (isOperator(value)) {
      if (!isOperator(operatorValue)) {
        const ChainResult = calculateEquals();

        setAnswerValue(ChainResult);
        setMemoryValue(ChainResult);
        setOperatorValue(value);
        setReadyToReplace(true);
      }
      else {
        setOperatorValue(value);
      }
    } else {
      setMemoryValue(answerValue);
      setOperatorValue(value);
      setReadyToReplace(true);
    }
  };

  // handleNumber Function
  const handleNumber = (value) => {
    if (readyToReplace || answerValue === "0") {
      return value;
    } else {
      return answerValue + value;
    }
  };

  //isOperator Function
  const isOperator = (value) => {
    return (
      value == "+" ||
      value == "-" ||
      value == "X" ||
      value == "÷" ||
      value == "."
    );
  };

  //toggleHistory Function
  const toggleHistory = () => {
    setIsHistoryVisible(!isHistoryVisible);
  };

  const addToHistory = (calculation) => {
    setHistory([...history, calculation])
  }

  const clearHistory = () => {
    setHistory([]);
  }

  //Calculate Function when pressed '='
  const calculateEquals = () => {
    let previous = parseFloat(memoryValue);
    let current = parseFloat(answerValue);

    switch (operatorValue) {
      case "+":
        return previous + current;
        break;
      case "-":
        return previous - current;
        break;
      case "X":
        return previous * current;
        break;
      case "÷":
        return previous / current;
        break;
      case ".":
        let result;
        if (!Number.isInteger(previous)) {
          previous = 0;
        }
        result = parseFloat(`${previous}.${current}`);
        return result;
        break;
      default:
        return current;
        break;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
      paddingHorizontal: 8,
      paddingBottom: 8,
    },
    displayContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      marginBottom: 16,
    },
    displayText: {
      fontSize: 60,
      color: "#fff",
    },
    equationText: {
      fontSize: 30,
      color: "#00ffff",
    },
    operatorText: {
      fontSize: 30,
      color: "red",
    },
    row: {
      flexDirection: "row",
      marginBottom: 8,
    },
    menuButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFDAB9",
      margin: 4,
      marginTop: 8,
      height: 80,
      width: 80,
      borderRadius: 20,
    },
    button: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFDAB9",
      marginHorizontal: 4,
      height: 80,
      width: 80,
      borderRadius: 20,
    },
    buttonWide: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFDAB9",
      marginHorizontal: 4,
      paddingHorizontal: 4,
      height: 80,
      width: 160,
      borderRadius: 20,
    },
    buttonRow1: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#A9A9A9",
      marginHorizontal: 4,
      height: 80,
      width: 80,
      borderRadius: 20,
    },
    EqualsButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 4,
      height: 80,
      width: 80,
      borderRadius: 20,
      backgroundColor: "#228B22",
    },
    ClearButton: {
      backgroundColor: "#FF0000",
    },
    deleteButton: {
      margin: 20,
      padding: 20,
      right: 0,
      top: 0,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      width: 50,
    },
    buttonOrange: {
      backgroundColor: "#FFA500",
    },
    buttonGrey: {
      backgroundColor: "#585454",
    },
    buttonText: {
      fontSize: 38,
      color: "#000",
    },
    TextinWhite: {
      fontSize: 38,
      color: "#fff",
    },
    buttonTextSecondary: {
      color: "#888",
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
      justifyContent: 'center',
      alignItems: 'center',
    },
    historyPanel: {
      maxHeight: "80%",
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      margin: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      elevation: 8,
    },
    historyTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
      color: "#333",
    },
    historyItem: {
      backgroundColor: "#f5f5f5",      // Light gray background for each item
      padding: 10,
      borderRadius: 8,
      width: "100%",
      marginVertical: 5,
      fontSize: 16,
      color: "#333",                    // Text color
      textAlign: "center",
      borderColor: "#e0e0e0",           // Subtle border color
      borderWidth: 1,
    },
    closeButton: {
      fontSize: 16,
      color: "#007BFF",
      marginTop: 15,
    },
    clearButton: {
      fontSize: 12,
      color: "#808080",
      marginTop: 15,
    },
    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, width: "100%", height: "100%" }}>
        {/* Results field Defaulted to 0 */}
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.menuButton, styles.buttonGrey]}
              onPress={toggleHistory}
            >
              <MaterialCommunityIcons name="clock-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => buttonPressed("DEL")}
            >
              <MaterialCommunityIcons name="backspace-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.displayContainer}>
            {/* Display Stored Operator */}
            <Text style={styles.displayText}> {answerValue}</Text>
            {/* Set results field value to answerValue */}
            <Text style={styles.operatorText}>{operatorValue}</Text>
          </View>

          {/* Includes a row of buttons "AC", "+/-", "%" , "÷"*/}
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, styles.ClearButton]}
              onPress={() => buttonPressed("AC")}
            >
              <Text style={styles.TextinWhite}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRow1}
              onPress={() => buttonPressed("+/-")}
            >
              <Text style={styles.buttonText}>+/-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRow1}
              onPress={() => buttonPressed("%")}
            >
              <Text style={styles.buttonText}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonRow1, styles.buttonOrange]}
              onPress={() => buttonPressed("÷")}
            >
              <Text style={[styles.buttonText]}>÷</Text>
            </TouchableOpacity>
          </View>

          {/* Includes a row of buttons "7", "8", "9", "x" */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("7")}
            >
              <Text style={[styles.buttonText]}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("8")}
            >
              <Text style={[styles.buttonText]}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("9")}
            >
              <Text style={[styles.buttonText]}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonOrange]}
              onPress={() => buttonPressed("X")}
            >
              <Text style={[styles.buttonText]}>x</Text>
            </TouchableOpacity>
          </View>

          {/* Includes a row of buttons "4", "5", "6", "-" */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("4")}
            >
              <Text style={[styles.buttonText]}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("5")}
            >
              <Text style={[styles.buttonText]}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("6")}
            >
              <Text style={[styles.buttonText]}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonOrange]}
              onPress={() => buttonPressed("-")}
            >
              <Text style={[styles.buttonText]}>-</Text>
            </TouchableOpacity>
          </View>

          {/* Includes a row of buttons "1", "2", "3", "+" */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("1")}
            >
              <Text style={[styles.buttonText]}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("2")}
            >
              <Text style={[styles.buttonText]}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("3")}
            >
              <Text style={[styles.buttonText]}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonOrange]}
              onPress={() => buttonPressed("+")}
            >
              <Text style={[styles.buttonText]}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Includes a row of buttons "0", ".", "=" */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.buttonWide}
              onPress={() => buttonPressed("0")}
            >
              <Text style={[styles.buttonText]}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed(".")}
            >
              <Text style={[styles.buttonText]}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.EqualsButton}
              onPress={() => buttonPressed("=")}
            >
              <Text style={[styles.TextinWhite]}>=</Text>
            </TouchableOpacity>
          </View>
          <StatusBar style="light content" />

          {/* History Modal */}
          <Modal
          transparent={true}
          visible={isHistoryVisible}
          animationType="fade"
          onRequestClose={toggleHistory}
          style={styles.modalBackground}
          >
          {/* Semi-transparent overlay */}
          <View style={styles.overlay}>
            <View style={styles.historyPanel}>
              <Text style={styles.historyTitle}>Calculation History</Text>
              {/* Add history items here */}
              <ScrollView>
              {history.map((item, index) => (
                <Text key={index} style={styles.historyItem}>{item}</Text>
              ))}
              </ScrollView>
              <TouchableOpacity onPress={clearHistory}>
                <Text style={styles.clearButton}>Clear Calculation History</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleHistory}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
}