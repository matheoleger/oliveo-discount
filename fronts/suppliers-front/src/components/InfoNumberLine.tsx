import { Flex, Text } from "@chakra-ui/react";

interface InfoNumberLineProps {
    entity: 'price' | 'stock',
    unit: number
    oldUnit?: number,
}

const InfoNumberLine = ({entity, unit, oldUnit}: InfoNumberLineProps) => {
    return (
        <Flex direction={'column'} justifyContent={'space-between'} minWidth={'100px'}>
            <Text fontSize={'xl'} textAlign={'start'}>{entity === 'price' ? 'Prix' : 'Stock'}</Text>
            <Flex direction={'row'} alignItems={'start'}>
                {entity === 'price' && oldUnit && (
                <Text as='s' color={'brand.primary'} fontSize={'3xl'} marginRight={'5px'} textAlign={'start'}>
                    {oldUnit}€
                </Text>)}
                <Text fontSize={'3xl'} textAlign={'start'}>
                    {unit}{entity === 'price' && '€'}
                </Text>
            </Flex>
        </Flex>
    )
};

export default InfoNumberLine;