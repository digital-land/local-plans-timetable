/**
 * GDS component: https://design-system.service.gov.uk/components/notification-banner/
 */

import { toDefaultLocalDateString } from "../../utils/timetable";

type NotificationBannerProps = {
  title: string;
  date?: string;
  message?: string;
};

export const NotificationBanner = ({
  title,
  date,
  message,
}: NotificationBannerProps): JSX.Element => {
  return (
    <div
      className="govuk-notification-banner govuk-!-width-two-thirds"
      aria-labelledby="govuk-notification-banner-title"
      data-module="govuk-notification-banner"
    >
      <div className="govuk-notification-banner__header">
        <h2 className="govuk-notification-banner__title">Important</h2>
      </div>
      <div className="govuk-notification-banner__content">
        <h3 className="govuk-notification-banner__heading">{title}</h3>
        {date && (
          <p className="govuk-body govuk-!-margin-bottom-1">
            Date: {toDefaultLocalDateString(date)}
          </p>
        )}
        {message && <p className="govuk-body">{message}</p>}
      </div>
    </div>
  );
};
