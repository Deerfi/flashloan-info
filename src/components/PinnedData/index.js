import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { RowBetween, RowFixed } from '../Row'
import { AutoColumn } from '../Column'
import { TYPE } from '../../Theme'
import { useSavedTokens, useSavedPools } from '../../contexts/LocalStorage'
import { Hover } from '..'
import TokenLogo from '../TokenLogo'
import AccountSearch from '../AccountSearch'
import { Bookmark, ChevronRight, X } from 'react-feather'
import { ButtonFaded } from '../ButtonStyled'
import FormattedName from '../FormattedName'

const RightColumn = styled.div`
  position: fixed;
  right: 0;
  top: 0px;
  height: 100vh;
  width: ${({ open }) => (open ? '160px' : '23px')};
  padding: 1.25rem;
  border-left: ${({ theme, open }) => '1px solid' + theme.bg3};
  background-color: ${({ theme }) => theme.bg1};
  z-index: 9999;
  overflow: auto;
  :hover {
    cursor: pointer;
  }
`

const SavedButton = styled(RowBetween)`
  padding-bottom: ${({ open }) => open && '20px'};
  border-bottom: ${({ theme, open }) => open && '1px solid' + theme.bg3};
  margin-bottom: ${({ open }) => open && '1.25rem'};

  :hover {
    cursor: pointer;
  }
`

const ScrollableDiv = styled(AutoColumn)`
  overflow: auto;
  padding-bottom: 60px;
`

const StyledIcon = styled.div`
  color: ${({ theme }) => theme.text2};
`

function PinnedData({ history, open, setSavedOpen }) {
  const [savedPools, , removePool] = useSavedPools()
  const [savedTokens, , removeToken] = useSavedTokens()

  return !open ? (
    <RightColumn open={open} onClick={() => setSavedOpen(true)}>
      <SavedButton open={open}>
        <StyledIcon>
          <Bookmark size={20} />
        </StyledIcon>
      </SavedButton>
    </RightColumn>
  ) : (
    <RightColumn gap="1rem" open={open}>
      <SavedButton onClick={() => setSavedOpen(false)} open={open}>
        <RowFixed>
          <StyledIcon>
            <Bookmark size={16} />
          </StyledIcon>
          <TYPE.main ml={'4px'}>Saved</TYPE.main>
        </RowFixed>
        <StyledIcon>
          <ChevronRight />
        </StyledIcon>
      </SavedButton>
      <AccountSearch small={true} />
      <AutoColumn gap="40px" style={{ marginTop: '2rem' }}>
        <AutoColumn gap={'12px'}>
          <TYPE.main>Pinned Pools</TYPE.main>
          {Object.keys(savedPools).filter((key) => {
            return !!savedPools[key]
          }).length > 0 ? (
            Object.keys(savedPools)
              .filter((address) => {
                return !!savedPools[address]
              })
              .map((address) => {
                const pool = savedPools[address]
                return (
                  <RowBetween key={pool.address}>
                    <ButtonFaded onClick={() => history.push('/pool/' + address)}>
                      <RowFixed>
                        <TYPE.header>
                          <FormattedName
                            text={'pool/' + pool.tokenSymbol}
                            maxCharacters={12}
                            fontSize={'12px'}
                          />
                        </TYPE.header>
                      </RowFixed>
                    </ButtonFaded>
                    <Hover onClick={() => removePool(pool.address)}>
                      <StyledIcon>
                        <X size={16} />
                      </StyledIcon>
                    </Hover>
                  </RowBetween>
                )
              })
          ) : (
            <TYPE.light>Pinned pools will appear here.</TYPE.light>
          )}
        </AutoColumn>
        <ScrollableDiv gap={'12px'}>
          <TYPE.main>Pinned Tokens</TYPE.main>
          {Object.keys(savedTokens).filter((key) => {
            return !!savedTokens[key]
          }).length > 0 ? (
            Object.keys(savedTokens)
              .filter((address) => {
                return !!savedTokens[address]
              })
              .map((address) => {
                const token = savedTokens[address]
                return (
                  <RowBetween key={address}>
                    <ButtonFaded onClick={() => history.push('/token/' + address)}>
                      <RowFixed>
                        <TokenLogo address={address} size={'14px'} />
                        <TYPE.header ml={'6px'}>
                          <FormattedName text={token.symbol} maxCharacters={12} fontSize={'12px'} />
                        </TYPE.header>
                      </RowFixed>
                    </ButtonFaded>
                    <Hover onClick={() => removeToken(address)}>
                      <StyledIcon>
                        <X size={16} />
                      </StyledIcon>
                    </Hover>
                  </RowBetween>
                )
              })
          ) : (
            <TYPE.light>Pinned tokens will appear here.</TYPE.light>
          )}
        </ScrollableDiv>
      </AutoColumn>
    </RightColumn>
  )
}

export default withRouter(PinnedData)
