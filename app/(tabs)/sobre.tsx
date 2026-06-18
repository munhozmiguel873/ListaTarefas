import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Tabs } from "expo-router";

export default function Sobre() {
  const urlDaFoto = "https://media.istockphoto.com/id/1495088043/pt/vetorial/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=S7d8ImMSfoLBMCaEJOffTVua003OAl2xUnzOsuKIwek=";

  return (
    <View style={styles.container}>
      <Tabs.Screen options={{ headerShown: false }} />

      <View style={styles.profileCard}>
        <Image source={{ uri: urlDaFoto }} style={styles.foto} />

        <Text style={styles.titulo}>Informações do Aluno</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.valor}>Miguel Dos Santos Munhoz</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Curso:</Text>
          <Text style={styles.valor}>Desenvolvimento de Sistemas</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Disciplina:</Text>
          <Text style={styles.valor}>PPDM</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  profileCard: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  foto: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    color: '#333',
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
    paddingBottom: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#666",
  },
  valor: {
    fontSize: 15,
    color: "#333",
    textAlign: "right",
    flex: 1,
    marginLeft: 10,
  },
});