import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: '#f34242',
  },
  section2: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: '#42f354',
    fontSize: '10px',
  },
})

// Create Document Component
export const BasicDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
        <View style={styles.section2}>
          <Text>Section #2</Text>
          <Text>Section #2</Text>
          <Text>Section #2</Text>
          <Text>Section #2</Text>
        </View>
        <View style={{ position: 'relative' }}>
          <Text>Left #3</Text>
          <View style={{ position: 'absolute', right: 0 }}>
            <Text>Right #3</Text>
          </View>
        </View>
      </View>
      <View style={styles.section2}>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
      </View>
      <View style={styles.section2}>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
      </View>
      <View style={styles.section2}>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
      </View>
      <View style={styles.section2} break>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
      </View>
      <View style={styles.section2}>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
      </View>
      <View style={styles.section2}>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
      </View>
      <View style={styles.section2}>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
      </View>
      <View style={styles.section2}>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
)
