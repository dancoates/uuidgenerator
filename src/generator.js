import React from 'react';
import {v4} from 'uuid';
import styled from 'styled-components';
import {RiFileCopy2Line} from 'react-icons/ri';
import {RiCheckboxCircleLine} from 'react-icons/ri';
import {RiRefreshLine} from 'react-icons/ri';
import {RiArrowRightLine} from 'react-icons/ri';
import useClipboard from "react-use-clipboard";
import {useState} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';

const Container = styled.div`
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Inner = styled.div`
    position: relative;
`;

const Uuid = styled.div`
    font-size: 3rem;
`;

const Copy = styled.div`
    cursor: pointer;
    &:hover {
        color: #087E8B;
    }
    position: absolute;
    font-size: 2rem;
    left: 100%;
    bottom: 100%;
    padding: 1rem;
    margin-left: -0.5rem;
    margin-bottom: -1.8rem;
`;

const Refresh = styled.button`
    position: absolute;
    cursor: pointer;
    &:hover {
        color: #087E8B;
    }
    font-size: 2rem;
    top: 100%;
    padding: 1rem;
    left: 50%;
    transform: translateX(-50%);
    outline: none;
    background: transparent;
    border: none;
    color: #C9DAEA;
`;

const CopyMany = styled.div`
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 3rem;
`;

const CountInput = styled.input`
    color: #C9DAEA;
    background: transparent;
    outline: none;
    border: none;
    font-family: Menlo, Monaco, monospace;
    font-size: 1rem;
    margin: 0 0.5rem;
    padding: 0;
    line-height: 1.6;
    width: 3rem;
    text-align: center;
    padding-bottom: 0.2rem;
    border-bottom: 1px dashed #C9DAEA;
`;

const CountSubmit = styled.button`
    border: none;
    outline: none;
    color: #C9DAEA;
    background: transparent;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        color: #087E8B;
    }
`;

const getNUuids = (num) => {
    return new Array(num).fill().map(_ => v4());
};

export default function() {


    const [nUuids, changeNUuids] = useState({
        count: 10,
        uuids: getNUuids(10)
    });

    const [mainUuid, changeMainUuid] = useState(v4());

    const [isMainUuidCopied, setMainUuidCopied] = useClipboard(mainUuid, {
        successDuration: 3000
    });

    const [isNUuidCopied, setNUuidCopied] = useClipboard(nUuids.uuids.join('\n'), {
        successDuration: 3000
    });

    useHotkeys('space', () => changeMainUuid(v4()));

    return <Container>
        <Inner>
            <Uuid>{mainUuid}</Uuid>

            <Copy onClick={setMainUuidCopied}>
                {isMainUuidCopied ? <RiCheckboxCircleLine/> : <RiFileCopy2Line/>}
            </Copy>

            <Refresh onClick={() => changeMainUuid(v4())}>
                <RiRefreshLine/>
            </Refresh>
        </Inner>

        <CopyMany>
            <form onSubmit={(e) => {
                e.preventDefault();
                setNUuidCopied();
            }}>
                <span onClick={setNUuidCopied}>{isNUuidCopied ? 'Copied' : 'Copy'}</span>
                <CountInput type='number' value={nUuids.count === 0 ? '' : nUuids.count} onChange={(e) => {
                    const count = +e.target.value;
                    changeNUuids({
                        count,
                        uuids: getNUuids(count)
                    })
                }}/>
                UUIDs
                <CountSubmit type="submit">
                    <RiArrowRightLine/>
                </CountSubmit>
            </form>
        </CopyMany>

    </Container>;
}