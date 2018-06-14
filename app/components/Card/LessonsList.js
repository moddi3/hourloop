import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import LessonCard from './LessonCard';
import { Header } from '../';

const LessonsList = ({
  rowData,
  colors,
  onLessonPress,
  onLongLessonPress,
  isLessonExpired,
  isLessonOngoing,
  refreshing,
  onRefresh,
  now,
}) => (
  <View style={styles.container}>
    {rowData.length === 0 ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Header color="#666" fontSize={24}>
          No lessons, yet.
        </Header>
      </View>
    ) : (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={rowData}
        renderItem={({ item }) => {
          const expired = isLessonExpired(item, now);
          const ongoing = isLessonOngoing(item, now);
          return (
            <LessonCard
              lesson={item}
              colors={colors}
              onPressItem={onLessonPress}
              onLongPressItem={onLongLessonPress}
              expired={expired}
              ongoing={ongoing}
            />
          );
        }}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    )}
  </View>
);

export default LessonsList;

LessonsList.propTypes = {
  rowData: PropTypes.arrayOf(PropTypes.object),
  colors: PropTypes.arrayOf(PropTypes.string),
  refreshing: PropTypes.bool,
  onLessonPress: PropTypes.func,
  onLongLessonPress: PropTypes.func,
  isLessonExpired: PropTypes.func,
  isLessonOngoing: PropTypes.func,
  onRefresh: PropTypes.func,
  now: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
