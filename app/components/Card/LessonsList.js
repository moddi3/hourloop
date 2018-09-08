import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl, StyleSheet, View, ScrollView } from 'react-native';

import LessonCard from './LessonCard';
import { Header } from '../';

class LessonsList extends Component {
  state = {};

  render() {
    const {
      rowData,
      colors,
      onLessonPress,
      onLongLessonPress,
      isLessonExpired,
      isLessonOngoing,
      refreshing,
      onRefresh,
      now,
    } = this.props;

    const list = rowData.length ? (
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
        ItemSeparatorComponent={() => <View style={{ flex: 1, height: 10 }} />}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    ) : (
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Header color="#666" fontSize={24}>
          No lessons, yet.
        </Header>
      </ScrollView>
    );

    return <View style={styles.container}>{list}</View>;
  }
}

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
