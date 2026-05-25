import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { Header } from "@/components/Header";
import { SummaryCards } from "@/components/SummaryCards";
import { ProductList, type Product } from "@/components/ProductList";
import { FloatingActionButton } from "@/components/FloatingActionButton";


const API_URL = "http://192.168.3.5:8081/produtos";

export default function VendasScreen() {
  const [products, setProducts] = useState<Product[]>([]);

  // Função que vai lá no Spring Boot buscar os produtos do banco de dados
  const fetchProdutos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erro ao buscar produtos");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor backend.");
    }
  };

  // Dispara a busca assim que o aplicativo abre a tela
  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <View className="flex-1 bg-black">
      <Header />
      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-bold text-white mb-4">Minhas Vendas</Text>

        <SummaryCards
          cards={[
            { title: "Vendas Totais", value: " 1.250,00", prefix: "R$" },
            { title: "Pedidos Pendentes", value: 3 },
          ]}
        />

        {/* Lista de todos os produtos */}
        <ProductList products={products} />
        
        <View className="h-24" />
      </ScrollView>
      <FloatingActionButton />
    </View>
  );
}