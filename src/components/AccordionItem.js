import { React, useState, useEffect } from 'react'
import { Image, View, StyleSheet, Text, ScrollView, TextInput, ActivityIndicator, RefreshControl, FlatList, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-web'


const AccordionItem = ({ id, title, author, bodyText }) => {

    const [editable, setEditable] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const [val, setVal] = useState()

    const editData = () => {
        console.log("val", val)
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: id,
                title: title,
                body: val,
                userId: author,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        setEditable(!editable)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setShowContent(!showContent)}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title} | By:Writer {author}</Text>

                </View>
            </TouchableOpacity>
            {showContent &&
                <View style={styles.body}>
                    <TouchableOpacity onLongPress={() => setEditable(!editable)}>
                        {editable ? (<>
                            <TextInput multiline defaultValue={bodyText}
                                onChangeText={(value) => setVal(value)} />
                            <TouchableOpacity style={styles.onClose} onPress={() => editData()}>
                                <Text style={styles.textFont}>Save</Text>
                            </TouchableOpacity>

                        </>
                        ) : (
                            <Text>{bodyText}</Text>
                        )}

                    </TouchableOpacity>

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
    onClose: {
        backgroundColor: '#8b2ab8',
        width: 50,
        paddingLeft: 10,
        padding: 5,
        margin: 2,
        borderRadius: 12
    },
    textFont: {
        color: "#ffffff"
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})
export default AccordionItem