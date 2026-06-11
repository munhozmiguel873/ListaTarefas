import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { router } from "expo-router";
import { tasks } from "../../data/tasks";

export default function Home() {
    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            router.push({
                                pathname: "/detalhes",
                                params: {
                                    titulo: item.titulo,
                                    data: item.data,
                                    categoria: item.categoria,
                                    descricao: item.descricao
                                },
                            })
                        }
                    >
                        {/* Fixed: Changed from <text> to <Text> */}
                        <Text style={styles.titulo}>
                            {item.titulo}
                        </Text>

                        {/* Fixed: Changed from <text> to <Text> */}
                        <Text>
                            Data: {item.data}
                        </Text>

                        <Text>
                            Categoria: {item.categoria}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
    },
    titulo: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
});