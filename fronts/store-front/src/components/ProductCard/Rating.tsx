import { StarIcon } from "@chakra-ui/icons";


export const Rating = ({rating}:{rating: number}) => {
    const maxRatingValue = 5;

    return (
        Array.from({length: maxRatingValue})
        .map((_, index) => index + 1)
        .map((index) => (
            <StarIcon
                key={index}
                color={index <= rating ? "brand.primary" : "brand.dark"}
            />
        ))
    )
}