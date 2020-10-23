import React from 'react';
import { FlatList } from 'react-native';

import Footer from './Footer';
import Item2 from './Item2';

class List2 extends React.Component {
  renderItem = ({ item }) => <Item2 {...item} />;
  keyExtractor = item => item.key;
  render() {
    const { onPressFooter, ...props } = this.props;
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        ListFooterComponent={footerProps => (
          <Footer {...footerProps} onPress={onPressFooter} />
        )}
        renderItem={this.renderItem}
        {...props}
      />
    );
  }
}
export default List2;
