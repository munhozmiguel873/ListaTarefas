import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function DetailsScreen() {
    const { titulo, descricao } = useLocalSearchParams<{ titulo: string, descricao: string }>();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.detailCard}>
                <Text style={styles.titulo}>{titulo || 'Título não informado'}</Text>
                <Text style={styles.descricao}>{descricao || 'Sem descrição.'}</Text>
            </View>
            
            <Button title="Voltar" onPress={() => router.back()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
        justifyContent: 'center'
    },
    detailCard: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: '#333'
    },
    descricao: {
        fontSize: 16,
        color: "#555",
        fontStyle: "italic",
        lineHeight: 22
    },
});