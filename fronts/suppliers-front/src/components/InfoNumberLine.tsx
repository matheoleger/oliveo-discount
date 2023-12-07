import { Flex, Text, theme } from "@chakra-ui/react";

interface InfoNumberLineProps {
    entity: 'price' | 'stock',
    unit: number
    oldUnit?: number,
}

const InfoNumberLine = ({entity, unit, oldUnit}: InfoNumberLineProps) => {
    // Todo : styliser
    return (
        <Flex direction={'column'} justifyContent={'space-between'}>
            <Text fontSize={'xl'}>{entity === 'price' ? 'Prix' : 'Stock'}</Text>
            <Flex direction={'row'} justifyContent={'space-between'}>
                {entity === 'price' && oldUnit && (
                <Text as='s' color={theme.colors.red} fontSize={'3xl'}>
                    {oldUnit}
                </Text>)}
                <Text fontSize={'3xl'}>
                    {unit}{entity === 'price' ? '€' : 'Unités' }
                </Text>
            </Flex>
        </Flex>
    )
};

export default InfoNumberLine;