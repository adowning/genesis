-- FUNCTION: public.set_current_timestamp_updated_at()

-- DROP FUNCTION public.set_current_timestamp_updated_at();

CREATE FUNCTION public.set_current_timestamp_updated_at()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$BODY$;

ALTER FUNCTION public.set_current_timestamp_updated_at()
    OWNER TO genesis;
