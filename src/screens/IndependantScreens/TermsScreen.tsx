import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ITheme} from '../../assets/globals/theme';
export default () => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}>
      <Text
        style={{
          color: colors.text,
          fontWeight: 'bold',
          fontSize: fontsize.h5,
          marginBottom: 10,
        }}>
        Welcome to app4rge.com!
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        These terms and conditions outline the rules and regulations for the use
        of App4rge's app, located at http://www.app4rge.com.
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        By accessing this app we assume you accept these terms and conditions.
        Do not continue to use app4rge.com if you do not agree to take all of
        the terms and conditions stated on this page.
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        The following terminology applies to these Terms and Conditions, Privacy
        Statement and Disclaimer Notice and all Agreements: "Client", "You" and
        "Your" refers to you, the person log on this app and compliant to the
        Company’s terms and conditions. "The Company", "Ourselves", "We", "Our"
        and "Us", refers to our Company. "Party", "Parties", or "Us", refers to
        both the Client and ourselves. All terms refer to the offer, acceptance
        and consideration of payment necessary to undertake the process of our
        assistance to the Client in the most appropriate manner for the express
        purpose of meeting the Client’s needs in respect of provision of the
        Company’s stated services, in accordance with and subject to, prevailing
        law of Netherlands. Any use of the above terminology or other words in
        the singular, plural, capitalization and/or he/she or they, are taken as
        interchangeable and therefore as referring to same.
      </Text>

      <Text style={{color: colors.text, fontSize: fontsize.h6}}>License</Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        Unless otherwise stated, App4rge and/or its licensors own the
        intellectual property rights for all material on app4rge.com. All
        intellectual property rights are reserved. You may access this from
        app4rge.com for your own personal use subjected to restrictions set in
        these terms and conditions.
      </Text>

      <Text style={{...styles.text, color: colors.text, fontSize: fontsize.h6}}>
        You must not:
      </Text>
      <View style={styles.listBase}>
        <Text style={styles.list}>
          {'\u2022'} Republish material from app4rge.com
        </Text>
        <Text style={styles.list}>
          {'\u2022'} Sell, rent or sub-license material from app4rge.com
        </Text>
        <Text style={styles.list}>
          {'\u2022'} Reproduce, duplicate or copy material from app4rge.com
        </Text>
        <Text style={styles.list}>
          {'\u2022'} Redistribute content from app4rge.com
        </Text>
      </View>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        This Agreement shall begin on the date hereof
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        Parts of this app offer an opportunity for users to post and exchange
        opinions and information in certain areas of the app. App4rge does not
        filter, edit, publish or review Comments prior to their presence on the
        app. Comments do not reflect the views and opinions of App4rge,its
        agents and/or affiliates. Comments reflect the views and opinions of the
        person who post their views and opinions. To the extent permitted by
        applicable laws, App4rge shall not be liable for the Comments or for any
        liability, damages or expenses caused and/or suffered as a result of any
        use of and/or posting of and/or appearance of the Comments on this app.
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        App4rge reserves the right to monitor all Comments and to remove any
        Comments which can be considered inappropriate, offensive or causes
        breach of these Terms and Conditions.
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        You warrant and represent that:
      </Text>

      <View style={styles.listBase}>
        <Text style={styles.list}>
          {'\u2022'} You are entitled to post the Comments on our app and have
          all necessary licenses and consents to do so;
        </Text>
        <Text style={styles.list}>
          {'\u2022'} The Comments do not invade any intellectual property right,
          including without limitation copyright, patent or trademark of any
          third party;
        </Text>
        <Text style={styles.list}>
          {'\u2022'} The Comments do not contain any defamatory, libelous,
          offensive, indecent or otherwise unlawful material which is an
          invasion of privacy
        </Text>
        <Text style={styles.list}>
          {'\u2022'} The Comments will not be used to solicit or promote
          business or custom or present commercial activities or unlawful
          activity.
        </Text>
      </View>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        You hereby grant App4rge a non-exclusive license to use, reproduce, edit
        and authorize others to use, reproduce and edit any of your Comments in
        any and all forms, formats or media.
      </Text>

      <Text style={{color: colors.text, fontSize: fontsize.h6}}>
        Hyperlinking to our Content
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        The following organizations may link to our app without prior written
        approval:
      </Text>

      <View style={styles.listBase}>
        <Text style={styles.list}>{'\u2022'} Government agencies;</Text>
        <Text style={styles.list}>{'\u2022'} Search engines;</Text>
        <Text style={styles.list}>{'\u2022'} News organizations;</Text>
        <Text style={styles.list}>
          {'\u2022'} Online directory distributors may link to our app in the
          same manner as they hyperlink to the Websites of other listed
          businesses; and
        </Text>
        <Text style={styles.list}>
          {'\u2022'} System wide Accredited Businesses except soliciting
          non-profit organizations, charity shopping malls, and charity
          fundraising groups which may not hyperlink to our Web site.
        </Text>
      </View>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        These organizations may link to our home page, to publications or to
        other app information so long as the link: (a) is not in any way
        deceptive; (b) does not falsely imply sponsorship, endorsement or
        approval of the linking party and its products and/or services; and (c)
        fits within the context of the linking party’s site.
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        We may consider and approve other link requests from the following types
        of organizations:
      </Text>

      <View style={styles.listBase}>
        <Text style={styles.list}>
          {'\u2022'} commonly-known consumer and/or business information
          sources;
        </Text>
        <Text style={styles.list}>{'\u2022'} dot.com community sites;</Text>
        <Text style={styles.list}>
          {'\u2022'} associations or other groups representing charities;
        </Text>
        <Text style={styles.list}>
          {'\u2022'} online directory distributors;
        </Text>
        <Text style={styles.list}>{'\u2022'} internet portals;</Text>
        <Text style={styles.list}>
          {'\u2022'} accounting, law and consulting firms; and
        </Text>
        <Text style={styles.list}>
          {'\u2022'} educational institutions and trade associations.
        </Text>
      </View>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        We will approve link requests from these organizations if we decide
        that: (a) the link would not make us look unfavorably to ourselves or to
        our accredited businesses; (b) the organization does not have any
        negative records with us; (c) the benefit to us from the visibility of
        the hyperlink compensates the absence of App4rge; and (d) the link is in
        the context of general resource information.
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        These organizations may link to our home page so long as the link: (a)
        is not in any way deceptive; (b) does not falsely imply sponsorship,
        endorsement or approval of the linking party and its products or
        services; and (c) fits within the context of the linking party’s site.
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        If you are one of the organizations listed in paragraph 2 above and are
        interested in linking to our app, you must inform us by sending an
        e-mail to App4rge. Please include your name, your organization name,
        contact information as well as the URL of your site, a list of any URLs
        from which you intend to link to our app, and a list of the URLs on our
        site to which you would like to link. Wait 2-3 weeks for a response.
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        Approved organizations may hyperlink to our app as follows:
      </Text>

      <View style={styles.listBase}>
        <Text style={styles.list}>
          {'\u2022'} By use of our corporate name; or
        </Text>
        <Text style={styles.list}>
          {'\u2022'} By use of the uniform resource locator being linked to; or
        </Text>
        <Text style={styles.list}>
          {'\u2022'} By use of any other description of our app being linked to
          that makes sense within the context and format of content on the
          linking party’s site.
        </Text>
      </View>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        No use of App4rge's logo or other artwork will be allowed for linking
        absent a trademark license agreement.
      </Text>

      <Text style={{color: colors.text, fontSize: fontsize.h6}}>
        Content Liability
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        We shall not be hold responsible for any content that appears on your
        app. You agree to protect and defend us against all claims that is
        rising on your app. No link(s) should appear on any app that may be
        interpreted as libelous, obscene or criminal, or which infringes,
        otherwise violates, or advocates the infringement or other violation of,
        any third party rights.
      </Text>

      <Text style={{color: colors.text, fontSize: fontsize.h6}}>
        Your Privacy
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        Please read Privacy Policy
      </Text>

      <Text style={{color: colors.text, fontSize: fontsize.h6}}>
        Reservation of Rights
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        We reserve the right to request that you remove all links or any
        particular link to our app. You approve to immediately remove all links
        to our app upon request. We also reserve the right to amen these terms
        and conditions and it’s linking policy at any time. By continuously
        linking to our app, you agree to be bound to and follow these linking
        terms and conditions.
      </Text>

      <Text style={{color: colors.text, fontSize: fontsize.h6}}>
        Removal of links from our app
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        If you find any link on our app that is offensive for any reason, you
        are free to contact and inform us any moment. We will consider requests
        to remove links but we are not obligated to or so or to respond to you
        directly.
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        We do not ensure that the information on this app is correct, we do not
        warrant its completeness or accuracy; nor do we promise to ensure that
        the app remains available or that the material on the app is kept up to
        date.
      </Text>

      <Text style={{color: colors.text, fontSize: fontsize.h6}}>
        Disclaimer
      </Text>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        To the maximum extent permitted by applicable law, we exclude all
        representations, warranties and conditions relating to our app and the
        use of this app. Nothing in this disclaimer will:
      </Text>

      <View style={styles.listBase}>
        <Text style={styles.list}>
          {'\u2022'} limit or exclude our or your liability for death or
          personal injury;
        </Text>
        <Text style={styles.list}>
          {'\u2022'} limit or exclude our or your liability for fraud or
          fraudulent misrepresentation;
        </Text>
        <Text style={styles.list}>
          {'\u2022'} limit any of our or your liabilities in any way that is not
          permitted under applicable law; or
        </Text>
        <Text style={styles.list}>
          {'\u2022'} exclude any of our or your liabilities that may not be
          excluded under applicable law.
        </Text>
      </View>

      <Text
        style={{...styles.text, color: colors.text, fontSize: fontsize.body2}}>
        The limitations and prohibitions of liability set in this Section and
        elsewhere in this disclaimer: (a) are subject to the preceding
        paragraph; and (b) govern all liabilities arising under the disclaimer,
        including liabilities arising in contract, in tort and for breach of
        statutory duty.
      </Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 10,
  },
  scrollView: {
    //alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  listBase: {},
  list: {color: '#000'},
});
