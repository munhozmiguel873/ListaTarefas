import { View, Text, StyleSheet } from "react-native";

export default function Sobre() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Informações do Aluno
      </Text>

      <Text>Nome: Miguel</Text>
      <Text>Curso: Desenvolvimento de Sistemas</Text>
      <Text>Disciplina: PPDM</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
});