import React from "react";
import { Text, SafeAreaView, View, Pressable, StyleSheet } from "react-native";

const InformacionPaciente = ({ paciente, setModalPaciente }) => {
  return (
    <SafeAreaView style={styles.contenedor}>
      <View>
        <Pressable onPress={() => setModalPaciente(false)}>
          <Text>Cerrar</Text>
        </Pressable>
      </View>
      <Text style={styles.titulo}>
        Informacion {""} <Text style={styles.tituloBold}>Paciente</Text>
      </Text>
      <Text>{paciente.paciente}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#F59E0B",
    flex: 1,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    color: "#FFF",
  },

  tituloBold: {
    fontWeight: "900",
  },
});
export default InformacionPaciente;
