function swapElements(array, index1, pos1, index2, pos2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
    array[index1].position = pos2
    array[index2].position = pos1
}

export default swapElements