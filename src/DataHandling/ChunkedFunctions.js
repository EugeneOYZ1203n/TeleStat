import _ from 'lodash';
import { chunkSize } from '../config';

export const chunkedFunction = (
    data, 
    initial, 
    accumulator_func, 
    mapping_func, 
    status_update_func
) => {
    return new Promise((resolve) => {
        const chunks = _.chunk(data, chunkSize); // Divide data into chunks
        let result = initial;
        let currentChunk = 0;

        const processNextChunk = () => {
            if (currentChunk < chunks.length) {
                const chunk_result = mapping_func(chunks[currentChunk])
                result = accumulator_func(result, chunk_result);
                currentChunk++;
                status_update_func(Math.round((currentChunk / chunks.length) * 100));
                setTimeout(processNextChunk, 0); // Process the next chunk after yielding control
            } else {
                resolve(result); // Return the final result
            }
        };

        processNextChunk();
    })
};