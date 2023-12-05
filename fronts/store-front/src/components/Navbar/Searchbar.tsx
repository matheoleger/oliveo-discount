import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { oliveoTheme } from '../../styles';

export const Searchbar = () => {
    return (
        <InputGroup variant='outlined' bgColor="brand.light" borderRadius={10} width={500} margin={"0 20px"}>
            <InputLeftElement>
                <SearchIcon/>
            </InputLeftElement>
            <Input placeholder='Research...'/>
        </InputGroup>
    )
}