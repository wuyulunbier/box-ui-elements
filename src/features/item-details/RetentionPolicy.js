/* @flow */
import * as React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';

import PlainButton from '../../components/plain-button';

import messages from './messages';

const datetimeOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
};

type Props = {
    dispositionTime?: number,
    openModal?: Function,
    policyType?: string,
    retentionPolicyDescription?: string,
};

const RetentionPolicy = ({ dispositionTime, openModal, policyType, retentionPolicyDescription }: Props) => {
    if (!retentionPolicyDescription) {
        return null;
    }

    return (
        <React.Fragment>
            <FormattedMessage tagName="dt" {...messages.retentionPolicyDescription} />
            <dd>{retentionPolicyDescription}</dd>
            {policyType !== 'indefinite' ? (
                <React.Fragment>
                    <FormattedMessage tagName="dt" {...messages.retentionPolicyExpiration} />
                    {dispositionTime ? (
                        <dd>
                            <FormattedDate value={new Date(dispositionTime)} {...datetimeOptions} />
                            {openModal ? (
                                <PlainButton className="lnk" onClick={openModal}>
                                    <FormattedMessage {...messages.retentionPolicyExtend} />
                                </PlainButton>
                            ) : null}
                        </dd>
                    ) : null}
                </React.Fragment>
            ) : null}
        </React.Fragment>
    );
};

export default RetentionPolicy;
