import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});

function MyDocument(props) {
    return (
        <div>
            {/* <PDFViewer>
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <Text>Section #1</Text>
                        </View>
                        <View style={styles.section}>
                            <Text>Section #2</Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer> */}
        </div>
    );
}

export default MyDocument;;