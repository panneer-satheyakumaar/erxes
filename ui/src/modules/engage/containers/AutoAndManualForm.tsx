import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { IUser } from 'modules/auth/types';
import { withProps } from 'modules/common/utils';
import { AddMutationResponse } from 'modules/segments/types';
import { IBrand } from 'modules/settings/brands/types';
import { queries } from 'modules/settings/emailTemplates/graphql';
import { queries as integrationQueries } from 'modules/settings/integrations/graphql';
import React from 'react';
import { graphql } from 'react-apollo';
import { EmailTemplatesQueryResponse } from '../../settings/emailTemplates/containers/List';
import AutoAndManualForm from '../components/AutoAndManualForm';
import FormBase from '../components/FormBase';
import { IEngageMessageDoc, IEngageScheduleDate } from '../types';
import withFormMutations from './withFormMutations';

type Props = {
  kind?: string;
  brands: IBrand[];
  scheduleDate?: IEngageScheduleDate;
  totalCountQuery?: any;
};

type FinalProps = {
  emailTemplatesQuery: EmailTemplatesQueryResponse;
  integrationConfigsQuery: any;
  users: IUser[];
  isActionLoading: boolean;
  save: (doc: IEngageMessageDoc) => Promise<any>;
  smsConfig: any;
} & Props &
  AddMutationResponse;

const AutoAndManualFormContainer = (props: FinalProps) => {
  const { emailTemplatesQuery, integrationConfigsQuery } = props;
  const integrations = integrationConfigsQuery.integrationsFetchApi || [];

  if (emailTemplatesQuery.loading) {
    return null;
  }

  const updatedProps = {
    ...props,
    templates: emailTemplatesQuery.emailTemplates || [],
    smsConfig: integrations.find(i => i.code === 'TELNYX_API_KEY') && null
  };

  const content = formProps => (
    <AutoAndManualForm {...updatedProps} {...formProps} />
  );

  return <FormBase kind={props.kind || ''} content={content} />;
};

const withTemplatesQuery = withFormMutations<Props>(
  withProps<Props>(
    compose(
      graphql<Props, EmailTemplatesQueryResponse>(gql(queries.emailTemplates), {
        name: 'emailTemplatesQuery',
        options: ({ totalCountQuery }) => ({
          variables: {
            perPage: totalCountQuery.emailTemplatesTotalCount
          }
        })
      })
    )(AutoAndManualFormContainer)
  )
);

export default withProps<Props>(
  compose(
    graphql(gql(queries.totalCount), {
      name: 'totalCountQuery'
    }),
    graphql(gql(integrationQueries.fetchApi), {
      name: 'integrationConfigsQuery',
      options: () => ({
        variables: {
          path: '/configs',
          params: {}
        }
      })
    })
  )(withTemplatesQuery)
);
