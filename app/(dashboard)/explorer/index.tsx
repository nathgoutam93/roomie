import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";

import Colors from "../../../constants/Colors";

import { Ionicons } from "@expo/vector-icons";
import InfoCard from "../../../components/explorer/Infocard";
import LoadingCard from "../../../components/explorer/loadingCard";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipableProfileCard from "../../../components/explorer/SwipableProfilecard";

import { data, fetchUsers, userWithaddress } from "../../../constants/fakeData";

const MIN_CARD = 4;
const MAX_UNDO_ITEMS = 5;

const ExploreScreen = () => {
  const [possibleMatches, setPossibleMatches] = useState<userWithaddress[]>([]); // const [currentPossibleMatch, setCurrentPossibleMatch] = useState(0);
  const [undoStack, setUndoStack] = useState<userWithaddress[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const handleNext = async () => {
    const removedUser = possibleMatches[0];
    setPossibleMatches((prv) => prv.slice(1));

    setUndoStack((prev) => {
      const newStack = [removedUser, ...prev];

      // Limit the stack size
      if (newStack.length > MAX_UNDO_ITEMS) {
        return newStack.slice(0, MAX_UNDO_ITEMS);
      }

      return newStack;
    });
  };

  const handleUndo = () => {
    const lastRemovedUser = undoStack[0];

    if (lastRemovedUser) {
      setPossibleMatches((prev) => [lastRemovedUser, ...prev]);

      setUndoStack((prev) => {
        const newStack = prev.slice(1);
        return newStack;
      });
    }
  };

  const handleSwipeLeft = () => {
    handleNext();
  };

  const handleSwipeRight = () => {
    handleNext();
  };

  useEffect(() => {
    if (possibleMatches.length - 1 - MIN_CARD > 0) return;

    setCurrentPage((prv) => prv + 1);
  }, [possibleMatches]);

  const getUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUsers(currentPage);
      setPossibleMatches((prv) => [...prv, ...data]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text
          style={{
            fontFamily: "cherry",
            fontSize: 32,
            color: Colors.light.text,
          }}
        >
          Roomie
        </Text>

        <View style={{ flexDirection: "row" }}>
          {undoStack.length > 0 && (
            <Pressable onPress={handleUndo} style={{ marginHorizontal: 6 }}>
              <Ionicons name="arrow-undo-outline" size={24} color="black" />
            </Pressable>
          )}
          <Pressable onPress={() => {}} style={{ marginHorizontal: 6 }}>
            <Ionicons name="filter-outline" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.container}>
        {possibleMatches.length > 0 ? (
          possibleMatches.map((user, index) => {
            return (
              <SwipableProfileCard
                key={user.id}
                user={user}
                index={index}
                totalItems={data.length}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              />
            );
          })
        ) : loading ? (
          <LoadingCard />
        ) : (
          <InfoCard
            title="That's everyone!"
            subtitle={`You've seen all the people nearby.\nChange your filters or check later.`}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
