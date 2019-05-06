import React from 'react';
import translate from '../../translate/translate';
import mainWindow, { staticVar } from '../../util/mainWindow';
import AddCoinTile from './addcoinTile';
import Config from '../../config';

const AddCoinRender = function() {
  return (
    <div onKeyDown={ (event) => this.handleKeydown(event) }>
      <div className={ `modal modal-3d-sign add-coin-modal ${this.state.className}` }>
        <div
          onClick={ this.dismiss }
          className="modal-close-overlay"></div>
        <div className="modal-dialog modal-center modal-lg">
          <div
            onClick={ this.dismiss }
            className="modal-close-overlay"></div>
          <div className="modal-content">
            <div className="modal-header bg-orange-a400 wallet-send-header">
              <button
                type="button"
                className="close white"
                onClick={ this.dismiss }>
                <span>×</span>
              </button>
              <h4 className="modal-title white">
                { translate('INDEX.SELECT_A_COIN') }
              </h4>
            </div>
            <div className="modal-body">
              <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12 addcoin-modes-block">
                { this.props.Main.coins &&
                  (staticVar.argv.indexOf('hardcore') > -1 || (!this.props.Main.coins.native.length && !this.isNativeCoinsSelected() && this.props.Main.isLoggedIn)) &&
                  <div className="form-group col-lg-3 col-md-3 col-sm-3 col-xs-3 style-addcoin-lbl-mdl-login">
                    <input
                      type="radio"
                      className="to-labelauty labelauty"
                      name="mode-spv"
                      id="addcoin-mode-spv"
                      disabled={ this.state.type !== 'spv' }
                      checked={ this.state.type === 'spv' }
                      readOnly />
                    <label
                      htmlFor="addcoin-mode-spv"
                      onClick={ () => this.updateModeType('spv') }>
                      { this.state.type !== 'spv' &&
                        <span className="labelauty-unchecked-image"></span>
                      }
                      { this.state.type !== 'spv' &&
                        <span
                          className="labelauty-unchecked">
                          { translate('INDEX.SPV_MODE') }
                        </span>
                      }
                      { this.state.type === 'spv' &&
                        <span className="labelauty-checked-image"></span>
                      }
                      { this.state.type === 'spv' &&
                        <span className="labelauty-checked">
                          { translate('INDEX.SPV_MODE') }
                        </span>
                      }
                    </label>
                  </div>
                }
                { this.props.Main.coins &&
                  (staticVar.argv.indexOf('hardcore') > -1 || (!this.props.Main.coins.spv.length && !this.props.Main.coins.eth.length && !this.isLiteCoinsSelected())) &&
                  <div className="form-group col-lg-3 col-md-3 col-sm-3 col-xs-3 style-addcoin-lbl-mdl-login">
                    <input
                      type="radio"
                      className="to-labelauty labelauty"
                      name="mode-native"
                      id="addcoin-mode-native"
                      disabled={ this.state.type !== 'native' }
                      checked={ this.state.type === 'native' }
                      readOnly />
                    <label
                      htmlFor="addcoin-mode-native"
                      onClick={ () => this.updateModeType('native') }>
                      { this.state.type !== 'native' &&
                        <span className="labelauty-unchecked-image"></span>
                      }
                      { this.state.type !== 'native' &&
                        <span
                          className="labelauty-unchecked">
                          { translate('INDEX.NATIVE_MODE') }
                        </span>
                      }
                      { this.state.type === 'native' &&
                        <span className="labelauty-checked-image"></span>
                      }
                      { this.state.type === 'native' &&
                        <span className="labelauty-checked">
                          { translate('INDEX.NATIVE_MODE') }
                        </span>
                      }
                    </label>
                  </div>
                }
                { this.props.Main.coins &&
                  (staticVar.argv.indexOf('hardcore') > -1 || (!this.props.Main.coins.native.length && !this.isNativeCoinsSelected() && this.props.Main.isLoggedIn)) &&
                  <div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-4 style-addcoin-lbl-mdl-login">
                    <input
                      type="radio"
                      className="to-labelauty labelauty"
                      name="mode-native"
                      id="addcoin-mode-native"
                      disabled={ this.state.type !== 'eth' }
                      checked={ this.state.type === 'eth' }
                      readOnly />
                    <label
                      htmlFor="addcoin-mode-eth"
                      onClick={ () => this.updateModeType('eth') }>
                      { this.state.type !== 'eth' &&
                        <span className="labelauty-unchecked-image"></span>
                      }
                      { this.state.type !== 'eth' &&
                        <span
                          className="labelauty-unchecked">
                          { translate('ADD_COIN.ETH_AND_ERC20_TOKENS') }
                        </span>
                      }
                      { this.state.type === 'eth' &&
                        <span className="labelauty-checked-image"></span>
                      }
                      { this.state.type === 'eth' &&
                        <span className="labelauty-checked">
                          { translate('ADD_COIN.ETH_AND_ERC20_TOKENS') }
                        </span>
                      }
                    </label>
                  </div>
                }
              </div>
              { this.state.type === 'spv' &&
                <div className="col-sm-12 form-group form-material margin-top-10">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={ this.state.kmdAcOnly }
                      readOnly />
                    <div
                      className="slider"
                      onClick={ this.toggleKmdAcOnly }></div>
                  </label>
                  <div
                    className="toggle-label margin-right-15 pointer iguana-core-toggle"
                    onClick={ this.toggleKmdAcOnly }>
                    { translate('ADD_COIN.SHOW_KMD_AC_ONLY') }
                  </div>
                </div>
              }
              <div className="col-sm-12">
                { this.state.type === 'spv' &&
                  <div>
                    <strong>{ translate('INDEX.SPV_MODE') }:</strong> { translate('ADD_COIN.LITE_MODE_DESC') }.
                  </div>
                }
                { this.state.type === 'native' &&
                  <div>
                    <strong>{ translate('INDEX.NATIVE_MODE') }:</strong> { translate('INDEX.NATIVE_MODE_DESC1') }&nbsp;
                    <strong>Komodo Daemon</strong> { translate('INDEX.NATIVE_MODE_DESC2') }
                    <div className="alert alert-icon alert-primary margin-top-20">
                      <i className="icon md-info-outline"></i>
                      <strong>{ translate('INDEX.NATIVE_MODE') }</strong> { translate('INDEX.NATIVE_MODE_DESC3') }&nbsp;
                      <strong>{ translate('INDEX.NATIVE_MODE_DESC4') }</strong>,&nbsp;
                      <i>{ translate('INDEX.NATIVE_MODE_DESC5') }</i>.
                    </div>
                  </div>
                }
              </div>
              <div className="col-sm-12 padding-left-none padding-top-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-4 style-addcoin-lbl-mdl-login">
                  <input
                    type="text"
                    name="quickSearch"
                    className="form-control normal-font"
                    onChange={ this.updateInput }
                    autoComplete="off"
                    placeholder={ translate('ADD_COIN.QUICK_SEARCH') } 
                    value={ this.state.quickSearch || '' } />
                </div>
                { ((this.state.type === 'native' && Config.native.detectDaemons) || (this.state.coins && Object.keys(this.state.coins).length > 0)) &&
                  <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6 style-addcoin-lbl-mdl-login">
                    { this.state.coins &&
                      Object.keys(this.state.coins).length > 0 &&
                      <button
                        type="button"
                        className="btn btn-primary col-sm-3 float-none"
                        onClick={ this.activateAllCoins }>
                        { translate('ADD_COIN.ACTIVATE') }
                      </button>
                    }
                    { this.state.type === 'native' &&
                      Config.native.detectDaemons &&
                      <button
                        type="button"
                        className={ 'btn btn-info col-sm-6 float-none' + (this.state.coins && Object.keys(this.state.coins).length > 0 ? ' margin-left-20' : '') }
                        onClick={ this.detectDaemons }>
                        { translate('ADD_COIN.' + (this.state.detectingDaemons ? 'DETECTING_ACTIVE_DAEMONS' : 'DETECT_ACTIVE_DAEMONS')) }
                      </button>
                    }
                  </div>
                }
              </div>
              <div className="col-sm-12 addcoin-tiles-outter-block">
                <AddCoinTile
                  type={ this.state.type }
                  coins={ this.state.coinsList }
                  tileClickCB={ this.updateCoinSelection }
                  activatedCoins={ this.state.coins }
                  activeCoins={ this.props.Main.coins }
                  display={ this.state.display }
                  kmdAcOnly={ this.state.kmdAcOnly } />
              </div>
              { !this.props.Main.isLoggedIn &&
                <button
                  className="btn btn-outline-primary btn-add-coin-item-options"
                  onClick={ this.toggleActionsMenu }>
                  <i className={ 'fa-chevron-' + (this.state.actionsMenu ? 'up' : 'down') }></i>
                </button>
              }
              { this.state.actionsMenu &&
                <span>
                  <button
                    className="btn btn-outline-primary btn-save-coin-selection"
                    onClick={ this.saveCoinSelection }>
                    { translate('ADD_COIN.SAVE_SELECTION') }
                  </button>
                  <button
                    className="btn btn-outline-primary btn-load-coin-selection"
                    onClick={ this.loadCoinSelection }>
                    { translate('ADD_COIN.LOAD_SELECTION') }
                  </button>
                </span>
              }
            </div>
          </div>
        </div>
      </div>
      <div className={ `modal-backdrop ${this.state.className}` }></div>
    </div>
  )
};

export default AddCoinRender;