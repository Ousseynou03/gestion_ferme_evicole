package com.dione.gestion_avicole.restImpl;

import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.FournisseurRest;
import com.dione.gestion_avicole.service.FournisseurService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class FournisseurRestImpl implements FournisseurRest {

    private FournisseurService fournisseurService;

    public FournisseurRestImpl(FournisseurService fournisseurService) {
        this.fournisseurService = fournisseurService;
    }

    @Override
    public ResponseEntity<String> ajoutFournisseur(Map<String, String> requestMap) {
        try {
            return fournisseurService.ajoutFournisseur(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
