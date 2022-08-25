import { React, useState, useEffect } from 'react'
import { Image, View, StyleSheet, Text, ScrollView, TextInput, ActivityIndicator, RefreshControl, FlatList, TouchableOpacity } from 'react-native'


const AccordionItem = ({ title, author, bodyText }) => {
    const [showContent, setShowContent] = useState(false)
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setShowContent(!showContent)}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title} | By:Writer {author}</Text>

                </View>
            </TouchableOpacity>
            {showContent && <View style={styles.body}>
                <Text>{bodyText}</Text>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: '2%',
        borderRadius: 12,
        backgroundColor: 'white',
        marginBottom: '2%',
        overflow: 'hidden'
    },
    title: {
        fontSize: 16,
        color: '#2d2d2d',
        fontWeight: 'bold',
    },
    body: {
        paddingHorizontal: '2%',
        paddingVertical: '3%'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})
export default AccordionItem