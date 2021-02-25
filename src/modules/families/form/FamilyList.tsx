import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ListItem, withTheme} from 'react-native-elements';
import BEmpty from '../../../core/components/BEmpty';
import {List} from 'react-native-paper';
import {theme} from '../../../core/style/theme';

const _FamilyList = (props: any) => {
  useEffect(() => {}, []);
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {props.families
          ? props.families.map((family, i) => (
              <View>
                <List.Item
                  style={{backgroundColor: theme.colors.secondaryFont}}
                  onPress={() => props.onPress(family)}
                  title={family.CODIGO}
                />
                <View style={styles.divisor} />
              </View>
            ))
          : null}
        {props.families && props.families.length == 0 ? (
          <BEmpty visible={true} />
        ) : null}
      </View>
      <View style={styles.spacer} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  spacer: {
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  divisor: {height: 1, backgroundColor: theme.colors.light},
});

export default withTheme(_FamilyList);
