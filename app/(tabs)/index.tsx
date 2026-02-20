import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function HomeScreen() {
  const [properties, setProperties] = useState<any[]>([]);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!location || !type || !price) return;

    const url = `http://172.20.10.4:5000/api/properties?location=${location}&type=${type}&price=${price}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.log(err));
  }, [location, type, price]);

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 36,
          fontWeight: "bold",
          marginTop: 70,
          marginBottom: 20,
        }}
      >
        Houses in Akure
      </Text>
      <View style={{ marginBottom: 20 }}>
        {/* Location */}
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
        >
          <Picker.Item label="Select Location" value="" />
          <Picker.Item label="Alagbaka" value="Alagbaka" />
          <Picker.Item label="Ijapo Estate" value="Ijapo Estate" />
          <Picker.Item label="Oba Ile" value="Oba Ile" />
        </Picker>

        {/* House Type */}
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="2 Bedroom" value="2bedroom" />
          <Picker.Item label="3 Bedroom" value="3bedroom" />
        </Picker>

        {/* Price Range */}
        <Picker
          selectedValue={price}
          onValueChange={(itemValue) => setPrice(itemValue)}
        >
          <Picker.Item label="Select Price Range" value="" />
          <Picker.Item label="₦500k - ₦1m" value="500000-1000000" />
          <Picker.Item label="₦1m - ₦2m" value="1000000-2000000" />
        </Picker>

        <Pressable
          onPress={() => {
            if (!location || !type || !price) return;

            const url = `http://172.20.10.4:5000/api/properties?location=${location}&type=${type}&price=${price}`;

            fetch(url)
              .then((res) => res.json())
              .then((data) => setProperties(data))
              .catch((err) => console.log(err));
          }}
          style={{
            backgroundColor: "#065f46",
            padding: 15,
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            Search
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={properties}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          console.log(item.images[0]),
          (
            <View style={{ marginTop: 15 }}>
              <Image
                source={{ uri: item.images[0] }}
                style={{ width: "100%", height: 200, borderRadius: 10 }}
              />

              <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 5 }}>
                {item.title}
              </Text>

              <Text>₦{item.price.toLocaleString()}</Text>
            </View>
          )
        )}
      />
    </View>
  );
}
