import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Detalhes() {

    const { titulo, data, categoria, descricao } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.texto}>Data: {data}</Text>
            <Text style={styles.texto}>Categoria: {categoria}</Text>
            <Text style={styles.descricao}>{descricao}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: "#fff" 
    },
    titulo: { 
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 10 
    },
    texto: {
        fontSize: 16,
        marginBottom: 5,
    },
    descricao: { 
        marginTop: 15, 
        fontSize: 16, 
        color: "#555",
        fontStyle: "italic"
    },
});