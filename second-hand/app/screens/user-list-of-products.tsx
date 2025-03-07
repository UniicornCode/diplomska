import {ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import globalStyles from "../../assets/css/globalStyles";
import BackButton from "../../components/buttons/BackButton";
import UserProductCard from "../../components/containers/UserProductCard";
import React, {useEffect, useState} from "react";
import {equalTo, get, getDatabase, orderByChild, query, ref} from "firebase/database";
import {IProduct, IRegister} from "../interfaces/types";
import {useAuth} from "../services/context/AuthContext";

// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {useFocusEffect} from "expo-router";

export default function UserListOfProducts(userData: IRegister | undefined) {
  const user = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const db = getDatabase();

  useFocusEffect(() => {
    if (user.user) {
      const userId = user.user.uid;
      const productsRef = ref(db, "products");
      const q = query(productsRef, orderByChild("userId"), equalTo(userId));

      // Use try-catch for error handling
      try {
        get(q)
            .then((snapshot) => {
              if (snapshot.exists()) {
                const productList: IProduct[] = [];
                snapshot.forEach((childSnapshot) => {
                  const productId = childSnapshot.key;
                  const productData = childSnapshot.val() as IProduct;
                  if (productId) {
                    productList.push({ ...productData, id: productId });
                  }
                });
                setProducts(productList);
              } else {
                // No products found for the current user.
                setProducts([]);
              }
            })
            .catch((error) => {
              console.error("Error fetching products:", error);
            })
            .finally(() => {
              setLoading(false); // Set loading to false when done
            });
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    }
  });

  return (
      <View style={globalStyles.background_transparent}>
        <ImageBackground
            source={require("../../assets/images/background.png")}
            style={globalStyles.background}
        >
          <ScrollView>
            <Text style={[globalStyles.wide_title, styles.custom_width]}>
              МОИ ПРОДУКТИ
            </Text>
            <BackButton
                title={"Назад"}
                source={require("../../assets/images/back-icon.png")}
            />
            <View style={globalStyles.container}>
              {loading ? (
                  // Show a loading indicator while products are being fetched
                  <ActivityIndicator size="large" color="#0000ff" />
              ) : products.length ? (
                  products.map((product) => (
                      <UserProductCard key={product.id} productId={product.id} {...product}/>
                  ))
              ) : (
                  <View
                      style={{
                        flex: 1,
                        backgroundColor: "transparent",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                  >
                    <Text style={styles.description}>
                      Немате додадено производи
                    </Text>
                  </View>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  custom_width: {
    maxWidth: 250,
    alignSelf: "center",
  },
  description: {
    alignSelf: "center",
    marginVertical: 20,
    textAlign: "center",
    fontSize: 18,
  },
});
