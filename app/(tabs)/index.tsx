import { useState } from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function HomeScreen() {
  const [properties, setProperties] = useState<any[]>([]);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const handleSearch = () => {
    if (!location || !type || !price) {
      console.log("Missing filters");
      return;
    }

    const url = `http://172.20.10.4:5000/api/properties?location=${location}&type=${type}&price=${price}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.log(err));
  };

  return (
    <FlatList
      data={properties}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 40 }}
      ListHeaderComponent={
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              marginTop: 70,
              marginBottom: 20,
            }}
          >
            Houses in Akure
          </Text>

          <Picker
            selectedValue={location}
            onValueChange={(itemValue) => setLocation(itemValue)}
          >
            <Picker.Item label="Select Location" value="" />
            <Picker.Item label="Alagbaka" value="Alagbaka" />
            <Picker.Item label="Ijapo Estate" value="Ijapo Estate" />
            <Picker.Item label="Oba Ile" value="Oba Ile" />
          </Picker>

          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Picker.Item label="Select Type" value="" />
            <Picker.Item
              label="3 Bedroom Apartment"
              value="3 bedroom Apartment"
            />
            <Picker.Item
              label="2 Bedroom Apartment"
              value="2 bedroom Apartment"
            />
            <Picker.Item
              label="1 Bedroom Apartment"
              value="1 bedroom Apartment"
            />
            <Picker.Item label="Self Contained" value="Self Contained" />
          </Picker>

          <Picker
            selectedValue={price}
            onValueChange={(itemValue) => setPrice(itemValue)}
          >
            <Picker.Item label="Select Price Range" value="" />
            <Picker.Item label="₦500k - ₦1m" value="500000-1000000" />
            <Picker.Item label="₦1m - ₦2m" value="1000000-2000000" />
          </Picker>

          <Pressable
            onPress={handleSearch}
            style={{
              backgroundColor: "#065f46",
              padding: 15,
              borderRadius: 8,
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Search
            </Text>
          </Pressable>
        </View>
      }
      renderItem={({ item }) => {
        return (
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <Image
              source={{ uri: item.images[0] }}
              style={{ width: "100%", height: 200, borderRadius: 10 }}
            />

            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 5 }}>
              {item.title}
            </Text>

            <Text>₦{item.price.toLocaleString()}</Text>
          </View>
        );
      }}
      ListEmptyComponent={
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No properties found
        </Text>
      }
    />
  );
}
