import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  messages: number;
  status: "active" | "out_of_stock";
  quantidade?: number; 
}

function StarRating({ rating }: { rating: number }) {
  return (
    <View className="flex-row items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? "star" : star - 0.5 <= rating ? "star-half" : "star-outline"}
          size={14}
          color={star <= rating ? "#5BE096" : "#4b5563"}
        />
      ))}
    </View>
  );
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // 2. Lógica da Tag Inteligente: Quantidade menor que 5.
  // (Coloquei 10 como padrão só para o app não quebrar caso o dado não venha)
  const qty = product.quantidade !== undefined ? product.quantidade : 10;
  const isEstoqueBaixo = qty < 5;

  return (
    <View className="flex-row gap-3 bg-zinc-900 p-4 rounded-2xl border border-zinc-800 mb-3">
      <View className="w-20 h-20 rounded-xl bg-zinc-800 items-center justify-center">
        <Ionicons name="cube-outline" size={32} color="#6b7280" />
      </View>

      <View className="flex-1">
        <View className="flex-row items-start justify-between gap-2">
          <Text className="font-medium text-white flex-1" numberOfLines={1}>
            {product.title}
          </Text>
          {/* Tag que muda de cor sozinha */}
          <Badge variant={isEstoqueBaixo ? "danger" : "success"}>
            {isEstoqueBaixo ? "Sem Estoque" : "Ativo"}
          </Badge>
        </View>

        <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
          {product.description}
        </Text>

        {/* 3. Preço e Quantidade visíveis */}
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-sm font-bold text-primary">
            {formatCurrency(product.price)}
          </Text>
          <Text className="text-xs font-medium text-gray-400">
            {qty} unidades
          </Text>
        </View>

        {/* 4. A nova linha de Botões */}
        <View className="flex-row items-center justify-between mt-3">
          
          {/* Botão Vender */}
          <TouchableOpacity
            className="bg-primary/20 border border-primary/50 px-3 py-1.5 rounded-lg flex-row items-center gap-1"
            activeOpacity={0.7}
          >
            <Ionicons name="cart-outline" size={14} color="#5BE096" />
            <Text className="text-primary text-xs font-bold">Vender</Text>
          </TouchableOpacity>

          {/* Lápis e Lixeira */}
          <View className="flex-row items-center gap-1">
            <TouchableOpacity
              className="p-2 rounded-full min-w-[36px] min-h-[36px] items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="pencil" size={16} color="#5BE096" />
            </TouchableOpacity>

            <TouchableOpacity
              className="p-2 rounded-full min-w-[36px] min-h-[36px] items-center justify-center bg-red-500/10"
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <View>
      <Text className="text-sm font-medium text-gray-400 mb-3">
        Meus Produtos ({products.length})
      </Text>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </View>
  );
}

export type { Product };