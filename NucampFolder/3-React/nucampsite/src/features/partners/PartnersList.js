import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import Partner from "./Partner";
import { selectAllPartners } from "./partnersSlice";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const PartnersList = () => {
  const partners = useSelector(selectAllPartners);

  const isLoading = useSelector((state) => state.partners.isLoading);
  const errMsg = useSelector((state) => state.partners.errMsg);

  return isLoading ? (
    <Loading />
  ) : errMsg ? (
    <Error errMsg={errMsg} />
  ) : (
    <Col className="mt-4">
      <Row>
        {partners.map((partner) => {
          return (
            <div className="d-flex mb-5" key={partner.id}>
              <Partner partner={partner} />
            </div>
          );
        })}
      </Row>
    </Col>
  );
};

export default PartnersList;
