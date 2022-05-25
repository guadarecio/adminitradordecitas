import React from "react";
import { Text, SafeAreaView } from "react-native";

const InformacionPaciente = ({ paciente }) => {
  return (
    <SafeAreaView>
      <Text>InformacionPaciente</Text>;<Text>{paciente.paciente}</Text>
    </SafeAreaView>
  );
};

export default InformacionPaciente;
