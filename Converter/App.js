import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    fetch('https://api.apilayer.com/exchangerates_data/latest', {
      headers: {
        'apikey': 'JJIEIgWYpR6y0JSHIh620fnKchpiV5mg'
      }
    })
    .then(response => response.json())
    .then(data => {
      const currencyData = data.rates;
      setCurrencies(Object.keys(currencyData));
      setSelectedCurrency('EUR');
      console.log('Valuutat:', Object.keys(currencyData));
    })
    .catch(error => console.error(error));
  }, []);

  const convertCurrency = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${selectedCurrency}`, {
      headers: {
        'apikey': 'JJIEIgWYpR6y0JSHIh620fnKchpiV5mg'
      }
    })
    .then(response => response.json())
    .then(data => {
      const rate = data.rates.EUR;
      const converted = (amount * rate).toFixed(2);
      setConvertedAmount(converted);
    })
    .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Picker style={{ height: 50, width: 200 }}
        selectedValue={selectedCurrency}
        onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
      >
        {currencies.map(currency => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
      />
      <Button title="Convert" onPress={convertCurrency} />
      {convertedAmount ? <Text>{convertedAmount} EUR</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 20,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default CurrencyConverter;