import { Ionicons } from "@expo/vector-icons";
import { SplashScreen, Tabs, useRouter } from "expo-router";
import { useAppwrite } from "../../contexts/AppwriteContext";
import { useEffect } from "react";
import Colors from "../../constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={32} style={{ marginBottom: -3 }} {...props} />;
}

const DashboardLayout = () => {
  const router = useRouter();
  const { isLoading, session, user } = useAppwrite();

  useEffect(() => {
    if (isLoading) return;

    if (!session) {
      router.replace("/auth");
      return;
    }

    if (!user) {
      router.replace("/basicDetails");
      return;
    }

    if (!user.built_profile) {
      router.replace("/moreBasicDetails");
    }
  }, [session, isLoading, user]);

  if (isLoading) return <SplashScreen />;

  return (
    <Tabs
      initialRouteName="explorer"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.light.primary,
          borderTopColor: Colors.light.primary,
          elevation: 0,
        },
        tabBarActiveTintColor: Colors.light.text,
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explorer"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="albums-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="heart-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chatbubbles-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chatbubbles-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default DashboardLayout;
