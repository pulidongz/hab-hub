import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";

import {
  Site,
  Nav,
  Grid,
  List,
  Button,
  RouterContextProvider,
  Header,
} from "tabler-react";

import type { NotificationProps } from "tabler-react";

type Props = {|
  +children: React.Node,
|};

type State = {|
  notificationsObjects: Array<NotificationProps>,
|};

type subNavItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +LinkComponent?: React.ElementType,
  +useExact?: boolean,
|};

type navItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +active?: boolean,
  +LinkComponent?: React.ElementType,
  +subItems?: Array<subNavItem>,
  +useExact?: boolean,
|};

const navBarItems: Array<navItem> = [
  {
    value: "HAB Portal",
    to: "/",
    icon: "home",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Site Monitoring Viewer",
    to: "/site-monitoring",
    icon: "image",
    LinkComponent: withRouter(NavLink),
  },
  {
    value: "HAB Advisory",
    to: "/hab-advisory",
    icon: "box",
    LinkComponent: withRouter(NavLink),
  },
  {
    value: "Data Contribution",
    to: "/data-contribution",
    icon: "file",
    LinkComponent: withRouter(NavLink),
  },
  {
    value: "About",
    to: "/about-hab",
    LinkComponent: withRouter(NavLink),
    icon: "calendar",
  },
];

const accountDropdownProps = {
  avatarURL: "./demo/faces/art/pacman.png",
  name: "HAB Admin",
  description: "Administrator",
  options: [
    { icon: "user", value: "Profile" },
    { icon: "settings", value: "Settings" },
    { icon: "mail", value: "Inbox", badge: "6" },
    { icon: "send", value: "Message" },
    { isDivider: true },
    { icon: "help-circle", value: "Need help?" },
    { icon: "log-out", value: "Sign out" },
  ],
};

class SiteWrapper extends React.Component<Props, State> {
  state = {
    notificationsObjects: [
      {
        unread: true,
        avatarURL: "demo/art/poring.png",
        message: (
          <React.Fragment>
            <strong>BFAR User</strong> uploaded new toxicity data.
          </React.Fragment>
        ),
        time: "10 minutes ago",
      },
      {
        unread: true,
        avatarURL: "emo/art/pacman.png",
        message: (
          <React.Fragment>
            <strong>HAB Admin</strong> started new task: UI design.
          </React.Fragment>
        ),
        time: "1 hour ago",
      },
    ],
  };

  render(): React.Node {
    const notificationsObjects = this.state.notificationsObjects || [];
    const unreadCount = this.state.notificationsObjects.reduce(
      (a, v) => a || v.unread,
      false
    );
    return (
      <Site.Wrapper
        headerProps={{
          href: "/",
          alt: "habs_logo",
          imageURL: "./demo/brand/habhub.png",
          notificationsTray: {
            notificationsObjects,
            markAllAsRead: () =>
              this.setState(
                () => ({
                  notificationsObjects: this.state.notificationsObjects.map(
                    v => ({ ...v, unread: false })
                  ),
                }),
                () =>
                  setTimeout(
                    () =>
                      this.setState({
                        notificationsObjects: this.state.notificationsObjects.map(
                          v => ({ ...v, unread: true })
                        ),
                      }),
                    5000
                  )
              ),
            unread: unreadCount,
          },
          accountDropdown: accountDropdownProps,
        }}
        navProps={{ itemsObjects: navBarItems }}
        routerContextComponentType={withRouter(RouterContextProvider)}
        footerProps={{
          copyright: (
            <React.Fragment>
              Copyright © 2019
              All rights reserved.
            </React.Fragment>
          ),
          nav: (
            <React.Fragment>
              <Grid.Col auto={true}>
                <List className="list-inline list-inline-dots mb-0">
                  <List.Item className="list-inline-item">
                    <a href="./docs/index.html">About the Project</a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="./docs/index.html">About the Team</a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="./faq.html">Project Partners</a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="./faq.html">FAQ</a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="./faq.html">Site Navigation</a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="./faq.html">Data Privacy Policy</a>
                  </List.Item>
                </List>
              </Grid.Col>
            </React.Fragment>
          ),
        }}
      >
        {this.props.children}
      </Site.Wrapper>
    );
  }
}

export default SiteWrapper;
