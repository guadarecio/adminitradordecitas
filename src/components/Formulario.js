import React, { useState, useEffect } from "react";
import {
  Modal,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const Formulario = ({
  modalVisible,
  setModalVisible,
  pacientes,
  setPacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteApp,
}) => {
  const [paciente, setPaciente] = useState("");
  const [id, setId] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [fecha, setFecha] = useState(new Date());

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setPaciente(pacienteObj.paciente);
      setId(pacienteObj.id);
      setPropietario(pacienteObj.propietario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setSintomas(pacienteObj.sintomas);
      setFecha(pacienteObj.fecha);
    }
  }, []);

  const handleCita = () => {
    if ([paciente, propietario, email, fecha, sintomas].includes(" ")) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    const nuevoPaciente = {
      id: Date.now(),
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    };

    if (id) {
      nuevoPaciente.id = id;

      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState
      );

      setPacientes(pacientesActualizados);
      setPacienteApp({});
    } else {
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]);
    }

    setPacientes([...pacientes, nuevoPaciente]);
    setModalVisible(!modalVisible);

    console.log(pacientes);

    setPaciente("");
    setId("");
    setPropietario("");
    setEmail("");
    setTelefono("");
    setFecha(new Date());
    setSintomas("");
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            Nueva <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable
            style={styles.btnCancelar}
            onPress={() => {
              setModalVisible(!modalVisible);
              setPacienteApp({});
              setId("");
              setPaciente("");
              setPropietario("");
              setEmail("");
              setTelefono("");
              setFecha(new Date());
              setSintomas("");
            }}
          >
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Paciente"
              placeholderTextColor={"#666"}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Propietario"
              placeholderTextColor={"#666"}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Propietario"
              placeholderTextColor={"#666"}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono Propietario"
              placeholderTextColor={"#666"}
              keyboardType="number-pad"
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>
            <View style={styles.fechaContenedor}>
              <DateTimePicker
                value={fecha}
                display="spinner"
                locale="es-ES"
                mode="datetime"
                onChange={(event, date) => setFecha(date)}
              />
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholder="Síntomas Paciente"
              placeholderTextColor={"#666"}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaTexto}>Agregar Paciente</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: "#6D28D9",
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

  btnCancelar: {
    marginVertical: 30,
    backgroundColor: "#5827A4",
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },

  btnCancelarTexto: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 20,
    textTransform: "uppercase",
  },

  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },

  label: {
    color: "#FFF",
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
  },

  sintomasInput: {
    height: 100,
  },

  fechaContenedor: {
    backgroundColor: "#FFF",
    borderRadius: 10,
  },

  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: "#F59E0B",
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },

  btnNuevaCitaTexto: {
    color: "#5827A4",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 20,
    textTransform: "uppercase",
  },
});

export default Formulario;
