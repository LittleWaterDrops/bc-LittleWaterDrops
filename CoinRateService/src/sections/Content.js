import React, { useEffect, useState } from 'react';
import {
    ScrollView, StyleSheet,






    View
} from 'react-native';
import { Rows, Table } from 'react-native-table-component';
import CoinCard from '../components/CoinCard';
import MoreButton from '../components/MoreButton';
import { isEmptyObject } from '../functions/isEmptyObject';
import SampleData from '../models/SampleMode.json';

export default Content = ({parentCallback, removableSymbol}) => {
    const [data, setData] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState([]);
    const [pageIdx, setPageIdx] = useState();
    const [tableData, setTableData] = useState([]);
    const [maxPage, setMaxPage] = useState(0);

    console.log('remove ? ' + removableSymbol);

    console.log(removableSymbol != '');
    
    if(removableSymbol != ''){
        let copyedData = [...tableData];

        copyedData[0][1] = <CoinCard 
        coinName={copyedData[0][1].props.coinName} 
        coinSymbol={copyedData[0][1].props.coinSymbol}
        cardSelected={true}
        parentCallback={this.selectCoinCallback}
        />;
    }


    pageIdxCallback = () => {
        if(pageIdx + 1 <= maxPage){
            setPageIdx(pageIdx => pageIdx + 1);
        }
    }
    
    foo = (columnNumber, rowNumber, selectedCoinIdx) =>{
        tableData[columnNumber][rowNumber] = <CoinCard 
        coinName={tableData[columnNumber][rowNumber].props.coinName} 
        coinSymbol={tableData[columnNumber][rowNumber].props.coinSymbol}
        coinIdx={selectedCoinIdx}
        cardSelected={true}
        parentCallback={this.selectCoinCallback}
        />;
    }
    koo = (columnNumber, rowNumber, selectedCoinIdx) =>{

        tableData[columnNumber][rowNumber] = <CoinCard 
        coinName={tableData[columnNumber][rowNumber].props.coinName} 
        coinSymbol={tableData[columnNumber][rowNumber].props.coinSymbol}
        coinIdx={selectedCoinIdx}
        cardSelected={false}
        parentCallback={this.selectCoinCallback}
        />;
    }
    
    selectCoinCallback = async (selectedCoinSymbol, selectedCoinIdx, buttonPressed) => {
        const columnNumber = Math.floor(selectedCoinIdx/3);
        const rowNumber = selectedCoinIdx%3;
        console.log(rowNumber);

        if(buttonPressed == true){
            foo(columnNumber,rowNumber,selectedCoinIdx);

            setSelectedCoin(selectedCoin => selectedCoin.concat(selectedCoinSymbol));
            console.log(selectedCoin.concat(selectedCoinSymbol));
        }
        else{
            koo(columnNumber,rowNumber,selectedCoinIdx);
            
            setSelectedCoin(selectedCoin => selectedCoin.filter(function(coinSymbol) { 
                return coinSymbol != selectedCoinSymbol;
            }));
        }


    }

    useEffect(() => {
        let copyedArray = [...selectedCoin];
        console.log('here i check 2 ');
        console.log(copyedArray);

        parentCallback(copyedArray);
    }, [selectedCoin]);



    useEffect(async () => {
        // this is real data
        // const cmcData = await CmcService();

        // this is sample data
        const cmcData = await SampleData;

        setData(cmcData);

        let maxPageIdx = Math.ceil(cmcData.data.length / 15);
        setMaxPage(maxPageIdx);
        setPageIdx(1);
    }, [data]);

    useEffect(() => {
        const tableCell = [];

        if(!isEmptyObject(data)){

            for(let i = 5 * (pageIdx - 1); i < 5 * (pageIdx == maxPage ? (pageIdx - 1) : pageIdx); i++){
                const rowData = [];
                for(let j = 0; j < 3; j++){
                    let idx = j + i * 3
                    rowData.push(<CoinCard 
                        coinName={data.data[idx].name} 
                        coinSymbol={data.data[idx].symbol}
                        coinIdx={idx}
                        cardSelected={false}
                        parentCallback={this.selectCoinCallback}
                        />
                    );
                }
                tableCell.push(rowData);
            }   
            if(pageIdx == maxPage){ 
                const remainedCoin = data.data.length - 15 * (pageIdx - 1);
                const remainedColumn = Math.ceil(remainedCoin / 3);
                const reaminedRow = remainedCoin - (remainedColumn - 1) * 3;

                for(let k = 0; k < remainedColumn; k++){
                    const rowData = [];

                    if(k == remainedColumn - 1){
                        for(m = 0; m < reaminedRow; m ++){
                            let idx = m + k * 3 + 15 * (pageIdx - 1);
                            rowData.push(<CoinCard 
                                coinName={data.data[idx].name} 
                                coinSymbol={data.data[idx].symbol}
                                coinIdx={idx}
                                cardSelected={false}
                                parentCallback={this.selectCoinCallback}
                                />
                            ); 
                        }
                        for(m = reaminedRow; m < 3; m ++){
                            rowData.push(null); 
                        }
                    }
                    else {
                        for(let l = 0; l < 3; l++){
                            let idx = l + k * 3 + 15 * (pageIdx - 1);
                            rowData.push(<CoinCard 
                                coinName={data.data[idx].name} 
                                coinSymbol={data.data[idx].symbol}
                                coinIdx={idx}
                                cardSelected={false}
                                parentCallback={this.selectCoinCallback}
                                />
                            );
                        }
                    }
                    tableCell.push(rowData);
                }  
            }
            // console.log(tableCell[0][0].props.coinName);
            setTableData(tableData.concat(tableCell));
        }
    }, [pageIdx]);

    return (
        <View style={styles.content}>
            <ScrollView style={styles.scrollView}>
                <View>
                    <Table borderStyle={{borderWidth: 16, borderColor: '#FFFFFF'}}>
                            <Rows data={tableData}/>
                    </Table>
                </View>
            </ScrollView>
            <MoreButton curPageIdx={pageIdx} maxPageIdx={maxPage} parentCallback={this.pageIdxCallback}/>
        </View>
    );
};



const styles = StyleSheet.create({
    content: {
        height: 560,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF'
    },
    scrollView: {
        width: 760,
    },
    abutton: {
        alignItems: "center",
        backgroundColor: "#F75322",
        padding: 10
    },
    bbutton: {
    alignItems: "center",
    backgroundColor: "#2CF722",
    padding: 10
    },
    cbutton: {
        alignItems: "center",
        backgroundColor: "#2822F7",
        padding: 10
    },
    
});
