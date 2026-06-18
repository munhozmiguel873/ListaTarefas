import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Alert, Modal, Button, Platform } from 'react-native';
import { useRouter } from "expo-router";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

// ==========================================
// ESTRUTURA DE DADOS E TIPAGEM (DATA)
// ==========================================
export interface Task {
    id: string;
    title: string;
    description: string;
    startDate: string; // Nova propriedade
    endDate: string;   // Nova propriedade
}

const initialTasks: Task[] = [
    { id: '1', title: 'Estudar React Native', description: 'Rever conceitos de Hooks.', startDate: '15/06/2026', endDate: '20/06/2026' },
    { id: '2', title: 'Acabar projeto', description: 'Finalizar a aplicação de lista de tarefas.', startDate: '18/06/2026', endDate: '25/06/2026' },
    { id: '3', title: 'Terminar Sprints', description: 'Concluir as sprints do projeto.', startDate: '01/06/2026', endDate: '30/06/2026' }
];

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function HomeScreen() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    
    // States para o cadastro de nova tarefa
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newStartDate, setNewStartDate] = useState('');
    const [newEndDate, setNewEndDate] = useState('');

    useEffect(() => {
        if (Platform.OS === 'web') {
            alert('Bem-vindo! Esta é a tela inicial do aplicativo de lista de tarefas.');
        } else {
            Alert.alert('Bem-vindo!', 'Esta é a tela inicial do aplicativo de lista de tarefas.');
        }
    }, []);

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddTask = () => {
        if (!newTitle.trim()) return;
        
        const newTask: Task = { 
            id: Math.random().toString(), 
            title: newTitle, 
            description: newDescription,
            startDate: newStartDate || 'Não informada',
            endDate: newEndDate || 'Não informada'
        };

        setTasks([...tasks, newTask]);
        
        // Limpar campos
        setNewTitle('');
        setNewDescription('');
        setNewStartDate('');
        setNewEndDate('');
        setModalVisible(false);
    };

    const handleDeleteTask = (id: string, title: string) => {
        if (Platform.OS === 'web') {
            const confirmar = window.confirm(`Deseja realmente remover "${title}"?`);
            if (confirmar) {
                setTasks(tasks.filter(t => t.id !== id));
            }
        } else {
            Alert.alert("Excluir Tarefa", `Deseja realmente remover "${title}"?`, [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => setTasks(tasks.filter(t => t.id !== id))
                }
            ]);
        }
    };

    const renderRightActions = (id: string, title: string) => {
        return (
            <TouchableOpacity
                style={styles.deleteSwipeButton}
                onPress={() => handleDeleteTask(id, title)}
            >
                <Text style={styles.deleteSwipeText}>Excluir</Text>
            </TouchableOpacity>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar tarefas..."
                    value={search}
                    onChangeText={setSearch}
                />

                <FlatList
                    data={filteredTasks}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Swipeable
                            renderRightActions={() => renderRightActions(item.id, item.title)}
                            overshootRight={false}
                        >
                            <TouchableOpacity
                                style={styles.cardContainer}
                                activeOpacity={0.7}
                                onPress={() => router.push(`/detalhes?titulo=${item.title}&descricao=${item.description}&inicio=${item.startDate}&fim=${item.endDate}` as any)}
                            >
                                <View style={styles.cardLeft}>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                    <Text numberOfLines={1} style={styles.cardDescription}>{item.description}</Text>
                                    
                                    {/* Exibição das Datas de Início e Fim */}
                                    <View style={styles.dateContainer}>
                                        <Text style={styles.dateText}>📅 Início: {item.startDate}</Text>
                                        <Text style={styles.dateText}>🏁 Fim: {item.endDate}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Swipeable>
                    )}
                />

                <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
                    <Text style={styles.fabText}>+</Text>
                </TouchableOpacity>

                {/* Modal para Adicionar Tarefa com Datas */}
                <Modal visible={modalVisible} animationType="fade" transparent={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Adicionar Nova Tarefa</Text>
                            
                            <TextInput style={styles.modalInput} placeholder="Título" value={newTitle} onChangeText={setNewTitle} />
                            <TextInput style={styles.modalInput} placeholder="Descrição" value={newDescription} onChangeText={setNewDescription} />
                            
                            {/* Novos Inputs de Data */}
                            <View style={styles.modalRow}>
                                <TextInput style={[styles.modalInput, { flex: 1, marginRight: 5 }]} placeholder="Início (DD/MM/AAAA)" value={newStartDate} onChangeText={setNewStartDate} />
                                <TextInput style={[styles.modalInput, { flex: 1, marginLeft: 5 }]} placeholder="Fim (DD/MM/AAAA)" value={newEndDate} onChangeText={setNewEndDate} />
                            </View>

                            <View style={styles.modalButtons}>
                                <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                                <Button title="Adicionar" onPress={handleAddTask} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </GestureHandlerRootView>
    );
}

// ==========================================
// ESTILIZAÇÃO
// ==========================================
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 50, backgroundColor: "#f5f5f5" },
    searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: '#fff' },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        alignItems: 'center',
        marginBottom: 10,
    },
    cardLeft: { flex: 1, padding: 16 },
    cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
    cardDescription: { color: '#666', marginBottom: 8 },
    dateContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, borderTopWidth: 0.5, borderColor: '#eee', paddingTop: 6 },
    dateText: { fontSize: 12, color: '#444', fontWeight: '500' },
    deleteSwipeButton: {
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '88%',
        borderRadius: 10,
        marginBottom: 10,
    },
    deleteSwipeText: { color: '#fff', fontWeight: 'bold' },
    fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#007AFF', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },
    fabText: { color: '#fff', fontSize: 30 },
    modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
    modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
    modalInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
    modalRow: { flexDirection: 'row', justifyContent: 'space-between' },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }
});