package it.java.drivers;

import com.wixpress.express.test.core.drivers.baseclasses.EditorComponentDriver;
import com.wixpress.express.test.core.drivers.baseclasses.WebDriverProxyWithComponents;

/**
 * Created by IntelliJ IDEA.
 * User: shaharz
 * Date: 12/28/11
 * Time: 6:53 PM
 * To change this template use File | Settings | File Templates.
 */
public class PanelSelectionListDriver extends EditorComponentDriver{

    public PanelSelectionListDriver(WebDriverProxyWithComponents driver, String locator) {
        super(driver, locator);
    }
}
