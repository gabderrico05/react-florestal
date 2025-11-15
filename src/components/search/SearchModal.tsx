import { Modal, ModalProps, View, Animated, Dimensions, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import ReturnButton from "../ReturnButton";
import Title from "../Title";
import SearchBar from "../SearchBar";

export type searchModalProps = ModalProps & {
    onClose: () => void;
}

const { width } = Dimensions.get('window');

export default function SearchModal({onClose, ...rest}: searchModalProps) {
    const slideAnim = useRef(new Animated.Value(width)).current;
    const searchBarRef = useRef<TextInput>(null);
    const [isTransparent, setIsTransparent] = useState(true);

    useEffect(() => {
        if (rest.visible) {
            // Slide in da direita para o centro
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                // Remove transparência e foca o SearchBar após a animação
                setIsTransparent(false);
                searchBarRef.current?.focus();
            });
        } else {
            // Slide out do centro para a direita
            Animated.timing(slideAnim, {
                toValue: width,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [rest.visible]);

    return(
        <Modal visible={rest.visible} animationType="none" transparent={isTransparent}>
            <Animated.View 
                className="flex-1 bg-gray-200"
                style={{
                    transform: [{ translateX: slideAnim }]
                }}
            >
                <View className="w-full flex-row mt-6 pl-10 gap-4">
                    <ReturnButton onPress={onClose}/>
                    <Title>Buscar Infração</Title>
                </View>

                <SearchBar ref={searchBarRef} />
            </Animated.View>
        </Modal>
    );
}