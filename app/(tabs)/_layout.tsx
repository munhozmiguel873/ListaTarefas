import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Tarefas",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="list"
                            size={size}
                            color={color}
                        />
                    ),

                }}
            />
            <Tabs.Screen
                name="sobre"
                options={{
                    title: "Sobre",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="information-circle"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}